# Azure AD Authentication

A simple web application that authenticates users against K.R. Mangalam University's Azure AD directory.

## Features
- Microsoft Azure AD authentication
- Domain restriction (@krmangalam.edu.in and @krmu.edu.in)
- User profile display
- Modern UI with responsive design

## Technologies
- Node.js
- Express.js
- Microsoft Identity Platform
- HTML/CSS

## Setup Instructions

### Prerequisites
- Node.js v18+
- Azure AD tenant administrator access

### Local Installation
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/azure-ad-auth-demo.git
cd azure-ad-auth-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
TENANT_ID=your-tenant-id
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:3000/auth/callback
```

4. Start the server:
```bash
npm start
```

## Azure AD Configuration
1. Register application in [Azure Portal](https://portal.azure.com):
   - **Name**: KRMU Auth Demo
   - **Supported Account Types**: Accounts in this organizational directory only
   - **Redirect URI**: `http://localhost:3000/auth/callback`

2. Create client secret under "Certificates & secrets"

3. Add API permissions:
   - Microsoft Graph → User.Read (delegated)
   
4. Replace in `.env`:
   - `TENANT_ID` - Directory (tenant) ID
   - `CLIENT_ID` - Application (client) ID
   - `CLIENT_SECRET` - Newly created secret value

## Deployment
### Free Hosting Options
1. **Vercel**:
   - Connect GitHub repo
   - Set environment variables
   - Deploy!

2. **Render**:
   - Create Web Service
   - Set environment variables
   - Deploy from GitHub

## Folder Structure
```
azure-ad-auth-demo/
├── public/
│   ├── dashboard.html
│   ├── login.html
│   └── error.html
├── index.js
├── package.json
└── README.md
```

## License
MIT License
```
