# Azure Static Web Apps Deployment Guide

This guide will walk you through deploying this static CV website to Azure Static Web Apps.

## Prerequisites

Before you begin, make sure you have:
- An Azure account (create a free account at https://azure.microsoft.com/free/)
- A GitHub account
- Git installed on your local machine
- This repository forked or available in your GitHub account

## What is Azure Static Web Apps?

Azure Static Web Apps is a service that automatically builds and deploys full stack web apps to Azure from a code repository. It's ideal for:
- Static websites (HTML, CSS, JavaScript)
- Single Page Applications (SPAs)
- JAMstack applications
- Websites with serverless APIs

**Benefits:**
- **Free tier available** - Perfect for personal projects and small sites
- **Automatic CI/CD** - Deploys automatically when you push to GitHub
- **Global distribution** - Content delivered via CDN for fast loading
- **Free SSL certificates** - Automatic HTTPS
- **Custom domains** - Easy to configure
- **Built-in authentication** - Optional integration with various providers

## Deployment Options

### Option 1: Deploy via Azure Portal (Recommended for Beginners)

#### Step 1: Sign in to Azure Portal
1. Go to https://portal.azure.com
2. Sign in with your Azure account

#### Step 2: Create a Static Web App
1. Click **"Create a resource"** in the left sidebar
2. Search for **"Static Web App"** and select it
3. Click **"Create"**

#### Step 3: Configure Basic Settings
Fill in the following details:
- **Subscription**: Select your Azure subscription
- **Resource Group**: Create new or select existing (e.g., "rg-static-cv")
- **Name**: Enter a unique name (e.g., "my-cv-website")
- **Plan type**: Select "Free" for personal projects
- **Region**: Choose a region close to your target audience (e.g., "East US 2")

#### Step 4: Connect to GitHub
1. Click **"Sign in with GitHub"** under Deployment details
2. Authorize Azure Static Web Apps to access your GitHub account
3. Select your repository organization
4. Choose the repository containing this CV website
5. Select the branch (typically "main" or "master")

#### Step 5: Configure Build Details
- **Build Presets**: Select "Custom"
- **App location**: `/` (root of repository)
- **Api location**: Leave empty (we don't have APIs)
- **Output location**: Leave empty (static HTML doesn't need build output)

#### Step 6: Review and Create
1. Click **"Review + create"**
2. Review your settings
3. Click **"Create"**

Azure will now:
- Create the Static Web App resource
- Set up a GitHub Actions workflow in your repository
- Build and deploy your website

#### Step 7: Monitor Deployment
1. Go to your GitHub repository
2. Click on **"Actions"** tab
3. You'll see a new workflow running
4. Wait for it to complete (usually 1-2 minutes)

#### Step 8: Access Your Website
1. Return to Azure Portal
2. Go to your Static Web App resource
3. Click on **"Overview"**
4. Find the **URL** (looks like: https://your-app-name.azurestaticapps.net)
5. Click the URL to view your deployed CV!

### Option 2: Deploy via Azure CLI

If you prefer command-line tools:

#### Prerequisites
- Install Azure CLI: https://docs.microsoft.com/cli/azure/install-azure-cli
- Install Azure Static Web Apps CLI: `npm install -g @azure/static-web-apps-cli`

#### Steps
```bash
# Login to Azure
az login

# Create a resource group
az group create --name rg-static-cv --location eastus2

# Create a static web app
az staticwebapp create \
    --name my-cv-website \
    --resource-group rg-static-cv \
    --source https://github.com/YOUR-USERNAME/YOUR-REPO \
    --location eastus2 \
    --branch main \
    --app-location "/" \
    --login-with-github
```

### Option 3: Deploy via VS Code Extension

1. Install the "Azure Static Web Apps" extension in VS Code
2. Click on the Azure icon in the sidebar
3. Sign in to Azure
4. Click the "+" button to create a new Static Web App
5. Follow the prompts to configure and deploy

## Understanding the GitHub Actions Workflow

After deployment, Azure creates a workflow file in your repository at:
`.github/workflows/azure-static-web-apps-<name>.yml`

This workflow:
- Triggers on push to your main branch
- Triggers on pull requests
- Builds and deploys your application automatically
- Runs quality checks

Example workflow structure:
```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
```

## Configuration Options

### Custom Domains
1. In Azure Portal, go to your Static Web App
2. Click **"Custom domains"** in the left menu
3. Click **"+ Add"**
4. Follow instructions to add your domain
5. Configure DNS settings with your domain provider

### Environment Variables
Add environment variables in Azure Portal:
1. Go to your Static Web App
2. Click **"Configuration"** in the left menu
3. Add application settings as needed

### staticwebapp.config.json
Create a configuration file in your repository root for advanced settings:

```json
{
  "routes": [
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  },
  "globalHeaders": {
    "cache-control": "public, max-age=3600"
  }
}
```

## Local Development and Testing

### Test Locally with Static Web Apps CLI
```bash
# Install the CLI
npm install -g @azure/static-web-apps-cli

# Run locally
swa start . --port 8080

# Open browser to http://localhost:8080
```

### Simple Local Server
Alternatively, use any static file server:

```bash
# Python
python -m http.server 8080

# Node.js (install http-server globally)
npx http-server -p 8080

# PHP
php -S localhost:8080
```

## Monitoring and Management

### View Deployment History
- GitHub Actions tab shows all deployments
- Azure Portal shows deployment status and logs

### View Analytics
1. In Azure Portal, go to your Static Web App
2. Click **"Metrics"** to see:
   - Request count
   - Data transfer
   - Response times

### Update Your Site
Simply push changes to your GitHub repository:
```bash
git add .
git commit -m "Update CV content"
git push origin main
```

The GitHub Actions workflow will automatically deploy your changes!

## Troubleshooting

### Deployment Failed
1. Check GitHub Actions logs for error messages
2. Verify file paths in workflow configuration
3. Ensure all required files are committed to repository

### Site Not Loading
1. Wait a few minutes after deployment
2. Clear browser cache
3. Check Azure Portal for deployment status

### Changes Not Appearing
1. Verify changes are pushed to correct branch
2. Check GitHub Actions workflow completed successfully
3. Clear browser cache and hard refresh (Ctrl+F5)

## Cost Management

### Free Tier Includes:
- 100 GB bandwidth per month
- 0.5 GB storage
- Free SSL certificates
- Custom domains (up to 5)

### Monitor Usage:
1. Go to Azure Portal
2. Navigate to "Cost Management + Billing"
3. View your spending and set up alerts

## Best Practices

1. **Use branches for testing**: Create pull requests to preview changes before merging
2. **Enable branch policies**: Protect your main branch
3. **Set up staging environments**: Use separate Static Web Apps for staging
4. **Optimize assets**: Minimize CSS/JS files for faster loading
5. **Add meta tags**: Improve SEO with proper meta tags in HTML
6. **Test responsiveness**: Ensure site works on all devices
7. **Monitor performance**: Use Azure metrics to track site performance

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Static Web Apps Quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Azure Free Account](https://azure.microsoft.com/free/)
- [Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)

## Support

If you encounter issues:
1. Check [Azure Status](https://status.azure.com/)
2. Visit [Azure Support](https://azure.microsoft.com/support/)
3. Ask on [Stack Overflow](https://stackoverflow.com/questions/tagged/azure-static-web-apps)
4. Join [Azure Community](https://techcommunity.microsoft.com/t5/azure/ct-p/Azure)

---

**Congratulations!** You now have a professional CV website deployed on Azure Static Web Apps with automatic CI/CD! 🎉
