
# Deployment Guide for AgroIntelligence Platform

This guide outlines the steps to deploy your AgroIntelligence application to production.

## Prerequisites

- A GitHub account
- A Netlify, Vercel, or similar hosting service account
- Node.js 16+ and npm installed locally

## Option 1: Deploy with Lovable

The easiest way to deploy your project is directly through Lovable:

1. Click on the "Share" button in the top navigation bar
2. Select "Publish"
3. Follow the prompts to deploy your application
4. Once deployed, you'll receive a URL to access your live application

## Option 2: Deploy to Netlify

1. **Prepare your application**
   
   Ensure your application is ready for production:
   ```bash
   npm run build
   ```

2. **Create a GitHub repository**
   
   - Export your project to GitHub using the "Export to GitHub" option in Lovable
   - Or create a new repository and push your code manually

3. **Connect to Netlify**
   
   - Log in to Netlify (https://www.netlify.com/)
   - Click "New site from Git"
   - Select GitHub and authorize Netlify
   - Choose your repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Configure domain (optional)**
   
   - In your Netlify site dashboard, go to "Domain settings"
   - Add a custom domain or use the provided Netlify subdomain

## Option 3: Deploy to Vercel

1. **Prepare your repository**
   
   Follow the GitHub repository setup steps from Option 2.

2. **Connect to Vercel**
   
   - Log in to Vercel (https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Configure environment variables (if needed)**
   
   - In your Vercel project dashboard, go to "Settings" > "Environment Variables"
   - Add any required environment variables

## Post-Deployment

After deploying, make sure to:

1. Test your application thoroughly on the deployed URL
2. Set up continuous integration for automatic deployments on code changes
3. Configure monitoring and analytics tools

## Additional Resources

- For backend/database setup, consider using Supabase for features like authentication and data storage
- To monitor application performance, tools like Google Analytics or Sentry can be integrated

## Troubleshooting

If you encounter issues during deployment:

1. Check your build logs for errors
2. Ensure all dependencies are properly installed
3. Verify that your application works locally before deploying
4. Check that environment variables are properly configured

For further assistance, refer to the documentation of your chosen hosting platform or reach out to the Lovable community.
