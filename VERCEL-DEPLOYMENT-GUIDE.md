# Vercel Deployment Guide - Legal Injury Information Platform

## 🚀 Quick Vercel Deployment (5 Minutes)

Vercel is perfect for getting your legal platform live quickly. It's simpler than AWS and handles scaling automatically.

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Your API keys ready

## 🔧 Step 1: Prepare Your Project

### Your project is already Vercel-ready! Just need to:

1. **Push to GitHub** (if not already there)
2. **Connect to Vercel**
3. **Add environment variables**

### Optional: Add Vercel configuration
Create `vercel.json` (already exists in your project):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Go to**: [vercel.com](https://vercel.com)
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project**:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./` (or leave blank)
   - **Build Command**: Leave blank (not needed)
   - **Output Directory**: Leave blank
6. **Click "Deploy"**

### Option B: Deploy from Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

## 🔑 Step 3: Add Environment Variables

### In Vercel Dashboard:
1. **Go to your project**
2. **Click "Settings"** tab
3. **Click "Environment Variables"**
4. **Add these variables**:

```
OPENAI_API_KEY = your_openai_api_key
HUBSPOT_ACCESS_TOKEN = your_hubspot_token
HUBSPOT_PORTAL_ID = your_portal_id
GOOGLE_API_KEY = your_google_api_key
GOOGLE_SPREADSHEET_ID = your_spreadsheet_id
NODE_ENV = production
```

5. **Click "Save"**
6. **Redeploy** (automatic or manual)

## 🎯 Step 4: Test Your Deployment

### Your URLs will be:
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-main.vercel.app`

### Test these endpoints:
```
Health Check: https://your-project.vercel.app/health
OpenAI Test: https://your-project.vercel.app/api/test
Config Status: https://your-project.vercel.app/api/config/status
Chat API: https://your-project.vercel.app/api/chat
```

## 📊 Step 5: Monitor Performance

### Vercel Analytics (Free):
1. **Go to your project dashboard**
2. **Click "Analytics"** tab
3. **View**:
   - Page views
   - Performance metrics
   - Error rates
   - Geographic distribution

### Function Logs:
1. **Click "Functions"** tab
2. **View execution logs**
3. **Monitor** API performance

## 🔧 Step 6: Custom Domain (Optional)

1. **Go to "Settings"** → "Domains"
2. **Add your domain** (e.g., `api.yourdomain.com`)
3. **Configure DNS** as instructed
4. **SSL certificate** is automatic

## 💰 Vercel Pricing

### Free Tier (Perfect for starting):
- **100GB bandwidth/month**
- **6,000 serverless function hours/month**
- **Unlimited personal projects**
- **Automatic HTTPS**
- **Global CDN**

### Pro Plan ($20/month) - When you scale:
- **1TB bandwidth/month**
- **100,000 serverless function hours/month**
- **Team collaboration**
- **Advanced analytics**

## 🚀 Step 7: Update HubSpot Integration

### Update your HubSpot pages:
```javascript
// Replace localhost with your Vercel URL
const API_BASE = 'https://your-project.vercel.app';

// Test connection
fetch(`${API_BASE}/api/test`)
  .then(response => response.json())
  .then(data => console.log('API connected:', data));
```

## 📈 Step 8: Scale When Needed

### Vercel automatically scales, but you can optimize:

1. **Enable Edge Functions** for global performance
2. **Add caching headers** for better performance
3. **Use Vercel KV** for Redis-like caching
4. **Monitor function execution times**

## 🔄 Migration Path to AWS

### When to consider AWS:
- **Traffic**: 100K+ users/month
- **Cost**: Vercel Pro + additional services > $100/month
- **Features**: Need advanced AWS services
- **Compliance**: Enterprise security requirements

### Migration strategy:
1. **Keep Vercel** for static assets
2. **Move API** to AWS Lambda
3. **Use CloudFront** for global CDN
4. **Gradual migration** to avoid downtime

## 🎉 Benefits of Vercel for Your Use Case

### ✅ Advantages:
- **5-minute deployment**
- **Automatic scaling**
- **Global CDN included**
- **Free SSL certificates**
- **GitHub integration**
- **Preview deployments**
- **Built-in analytics**

### ✅ Perfect for:
- **Rapid prototyping**
- **MVP launches**
- **Paid marketing campaigns**
- **Traffic spikes**
- **Legal case launches**

## 📋 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Connect repository to Vercel
- [ ] Add environment variables
- [ ] Deploy successfully
- [ ] Test all endpoints
- [ ] Update HubSpot integration
- [ ] Set up custom domain (optional)
- [ ] Monitor performance
- [ ] Set up analytics

## 🚨 Troubleshooting

### Common Issues:

**"Function not found" error:**
- Check `vercel.json` configuration
- Ensure `server.js` is the entry point

**"Environment variable not found":**
- Add variables in Vercel dashboard
- Redeploy after adding variables

**"CORS error":**
- CORS is already configured in your server
- Check if calling from correct domain

**"Timeout error":**
- Vercel has 10-second timeout on free tier
- Consider Pro plan for longer timeouts

## 🎯 Next Steps After Deployment

1. **Test all functionality** thoroughly
2. **Update HubSpot** to use new API URL
3. **Monitor performance** for first week
4. **Set up alerts** for errors
5. **Plan marketing campaigns** with confidence

## 💡 Pro Tips

1. **Use preview deployments** for testing
2. **Set up branch protection** in GitHub
3. **Monitor function execution times**
4. **Use Vercel's edge functions** for global performance
5. **Set up custom domains** for branding

---

**Your legal platform will be live in 5 minutes with Vercel! Perfect for launching paid marketing campaigns quickly.** 