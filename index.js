require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

const CONFIG = {
    tenantId: process.env.TENANT_ID,
    clientId: process.env.CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
    clientSecret: process.env.CLIENT_SECRET
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/login', handleLogin);
app.get('/auth/callback', handleCallback);

async function handleLogin(req, res) {
    const authUrl = new URL(`https://login.microsoftonline.com/${CONFIG.tenantId}/oauth2/v2.0/authorize`);
    const params = {
        client_id: CONFIG.clientId,
        response_type: 'code',
        redirect_uri: CONFIG.redirectUri,
        scope: 'User.Read openid profile email',
        response_mode: 'query'
    };
    Object.entries(params).forEach(([k, v]) => authUrl.searchParams.append(k, v));
    res.redirect(authUrl.toString());
}

async function handleCallback(req, res) {
    try {
        const code = req.query.code;
        if (!code) throw new Error('Missing authorization code');

        const tokenResponse = await axios.post(
            `https://login.microsoftonline.com/${CONFIG.tenantId}/oauth2/v2.0/token`,
            new URLSearchParams({
                client_id: CONFIG.clientId,
                client_secret: CONFIG.clientSecret,
                code,
                redirect_uri: CONFIG.redirectUri,
                grant_type: 'authorization_code',
                scope: 'User.Read openid profile email'
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const user = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
        }).then(res => res.data);

        const email = (user.mail || user.userPrincipalName).toLowerCase();

        if (!['@krmangalam.edu.in', '@krmu.edu.in'].some(d => email.endsWith(d))) {
            return res.redirect('/error.html?message=Invalid%20domain%20access');
        }

        res.redirect(`/dashboard.html?name=${encodeURIComponent(user.displayName)}&email=${encodeURIComponent(email)}`);

    } catch (error) {
        res.redirect(`/error.html?message=${encodeURIComponent(error.message)}`);
    }
}

app.listen(port, () => console.log(`Server running: http://localhost:${port}`));