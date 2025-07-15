# AWS Console Deployment Guide - No CLI Required

## 🎯 Overview

This guide will walk you through deploying your legal injury information platform directly from the AWS Console using CloudFormation, without needing to install the AWS CLI.

## 📦 Step 1: Prepare Your Deployment Package

### Create a ZIP file with your code:
1. **Select these files** from your project:
   - `server-lambda.js` (rename to `server.js`)
   - `data-integration-service.js`
   - `hubspot-connector.js`
   - `google-sheets-connector.js`
   - `server-ai-config.js`
   - `package.json`
   - All files in `scripts/` folder
   - `index.html`
   - `article.html`
   - All image files (`.webp`, `.svg`, `.png`)

2. **Create a ZIP file** containing all these files
3. **Name it**: `legal-platform-deployment.zip`

## 🏗️ Step 2: Deploy via AWS Console

### Option A: Use CloudFormation (Recommended)

1. **Go to AWS Console**: [console.aws.amazon.com](https://console.aws.amazon.com)
2. **Navigate to CloudFormation**: Search for "CloudFormation" in services
3. **Click "Create stack"**
4. **Choose "With new resources"**
5. **Upload template**: Use the `template.yaml` file
6. **Click "Next"**

### Option B: Use Lambda Console (Simpler)

1. **Go to Lambda Console**: [console.aws.amazon.com/lambda](https://console.aws.amazon.com/lambda)
2. **Click "Create function"**
3. **Choose "Author from scratch"**
4. **Function name**: `legal-platform-api`
5. **Runtime**: Node.js 18.x
6. **Click "Create function"**

## 🔧 Step 3: Configure Lambda Function

### Upload Your Code:
1. **In Lambda console**, scroll to "Code source"
2. **Click "Upload from"** → ".zip file"
3. **Upload** your `legal-platform-deployment.zip`
4. **Click "Save"**

### Set Environment Variables:
1. **Scroll to "Configuration"** tab
2. **Click "Environment variables"**
3. **Add these variables**:
   ```
   OPENAI_API_KEY = your_openai_api_key
   HUBSPOT_ACCESS_TOKEN = your_hubspot_token
   HUBSPOT_PORTAL_ID = your_portal_id
   GOOGLE_API_KEY = your_google_api_key
   GOOGLE_SPREADSHEET_ID = your_spreadsheet_id
   NODE_ENV = production
   ```

### Configure Function Settings:
1. **Click "General configuration"**
2. **Click "Edit"**
3. **Set these values**:
   - **Timeout**: 30 seconds
   - **Memory**: 1024 MB
4. **Click "Save"**

## 🌐 Step 4: Create API Gateway

1. **Go to API Gateway**: [console.aws.amazon.com/apigateway](https://console.aws.amazon.com/apigateway)
2. **Click "Create API"**
3. **Choose "REST API"** → "Build"
4. **API name**: `Legal Platform API`
5. **Click "Create API"**

### Create Resources and Methods:
1. **Click "Actions"** → "Create Resource"
2. **Resource Name**: `api`
3. **Click "Create Resource"**

### Add Proxy Resource:
1. **Select `/api` resource**
2. **Click "Actions"** → "Create Resource"
3. **Resource Name**: `{proxy+}`
4. **Check "Configure as proxy resource"**
5. **Click "Create Resource"**

### Configure Proxy Integration:
1. **Select the `{proxy+}` resource**
2. **Click "Actions"** → "Create Method"
3. **Select "ANY"** from dropdown
4. **Click checkmark**
5. **Integration type**: Lambda Function
6. **Lambda Function**: `legal-platform-api`
7. **Click "Save"**

## 🚀 Step 5: Deploy Your API

1. **Click "Actions"** → "Deploy API"
2. **Deployment stage**: `prod`
3. **Stage description**: `Production deployment`
4. **Click "Deploy"**

### Get Your API URL:
- Your API will be available at: `https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/`

## 📊 Step 6: Test Your Deployment

### Test Health Check:
```
https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/health
```

### Test OpenAI Connection:
```
https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/api/test
```

### Test Configuration:
```
https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/api/config/status
```

## 🔧 Step 7: Add CloudFront CDN (Optional)

1. **Go to CloudFront**: [console.aws.amazon.com/cloudfront](https://console.aws.amazon.com/cloudfront)
2. **Click "Create Distribution"**
3. **Origin Domain**: Your API Gateway URL
4. **Viewer Protocol Policy**: Redirect HTTP to HTTPS
5. **Click "Create Distribution"**

## 📈 Step 8: Set Up Monitoring

### CloudWatch Dashboard:
1. **Go to CloudWatch**: [console.aws.amazon.com/cloudwatch](https://console.aws.amazon.com/cloudwatch)
2. **Click "Dashboards"** → "Create dashboard"
3. **Add widgets** for:
   - Lambda invocations
   - API Gateway requests
   - Error rates

### Set Up Alarms:
1. **Click "Alarms"** → "Create alarm"
2. **Create billing alarm** at $100/month
3. **Create error rate alarm** for 5XX errors

## 🎯 Step 9: Update HubSpot Integration

### Update your HubSpot pages to use the new API:
```javascript
// Replace your localhost URL with the new AWS URL
const API_BASE = 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod';

// Test the connection
fetch(`${API_BASE}/api/test`)
  .then(response => response.json())
  .then(data => console.log('API connected:', data));
```

## 💰 Step 10: Monitor Costs

### Check AWS Billing:
1. **Go to Billing**: [console.aws.amazon.com/billing](https://console.aws.amazon.com/billing)
2. **Click "Bills"** to monitor monthly charges
3. **Set up billing alerts** to avoid surprises

## 🚨 Troubleshooting

### Common Issues:

**"Function not found" error:**
- Check Lambda function name matches API Gateway integration

**"Internal server error":**
- Check CloudWatch logs for Lambda errors
- Verify environment variables are set correctly

**"CORS error":**
- Add CORS headers in API Gateway
- Or configure CORS in your Lambda function

**"Timeout error":**
- Increase Lambda timeout to 30 seconds
- Check if external APIs are responding slowly

## 📋 Deployment Checklist

- [ ] Lambda function created and configured
- [ ] Environment variables set
- [ ] API Gateway created with proxy integration
- [ ] API deployed to production stage
- [ ] Health check endpoint working
- [ ] OpenAI connection tested
- [ ] CloudFront CDN configured (optional)
- [ ] Monitoring dashboard created
- [ ] Billing alerts set up
- [ ] HubSpot integration updated

## 🎉 Success!

Your legal platform is now running on AWS and ready for high-traffic paid marketing campaigns!

**Your API URL**: `https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/`

**Estimated monthly cost**: $15-50 (depending on traffic)

---

**Need help?** Check CloudWatch logs for detailed error messages and performance metrics. 