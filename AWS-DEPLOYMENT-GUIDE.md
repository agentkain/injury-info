# AWS Deployment Guide - High-Traffic Legal Platform

## 🎯 Overview

This guide is designed for deploying your legal injury information platform on AWS to handle high-traffic paid marketing campaigns. The architecture is optimized for scalability, performance, and cost-efficiency.

## 🏗️ Recommended Architecture

### Production Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HubSpot CMS   │    │  AWS CloudFront │    │  External APIs  │
│                 │    │  + API Gateway  │    │                 │
│ • Landing Pages │◄──►│ • Lambda API    │◄──►│ • OpenAI        │
│ • Forms         │    │ • Auto-scaling  │    │ • Google Sheets │
│ • Content       │    │ • Global CDN    │    │ • HubSpot API   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  AWS Services   │
                    │ • Lambda        │
                    │ • DynamoDB      │
                    │ • S3            │
                    │ • CloudWatch    │
                    │ • Secrets Mgr   │
                    └─────────────────┘
```

## 📊 Traffic Expectations & Scaling

### Traffic Scenarios
- **Low Traffic**: 1K-10K users/month
- **Medium Traffic**: 10K-100K users/month  
- **High Traffic**: 100K-1M users/month
- **Viral Traffic**: 1M+ users/month (mass tort cases)

### Cost Projections
| Traffic Level | Monthly Cost | Key Services |
|---------------|--------------|--------------|
| **Low** | $15-30 | Lambda + API Gateway + CloudFront |
| **Medium** | $50-150 | + DynamoDB + CloudWatch |
| **High** | $200-500 | + Auto-scaling + Reserved instances |
| **Viral** | $500-2000 | + Multi-region + Advanced caching |

## 🚀 Phase 1: Serverless Setup (Recommended Start)

### Step 1: AWS Account Setup
1. **Create AWS Account**: [aws.amazon.com](https://aws.amazon.com)
2. **Enable MFA**: Security best practice
3. **Create IAM User**: For deployment (not root)
4. **Install AWS CLI**: For deployment automation

### Step 2: Install AWS SAM
```bash
# Install AWS SAM CLI
pip install aws-sam-cli

# Verify installation
sam --version
```

### Step 3: Create SAM Template
Create `template.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Timeout: 30
    Runtime: nodejs18.x
    Environment:
      Variables:
        NODE_ENV: production

Resources:
  # Main API Function
  LegalInfoAPI:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./
      Handler: server.handler
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /{proxy+}
            Method: ANY
      Environment:
        Variables:
          OPENAI_API_KEY: !Ref OpenAIApiKey
          HUBSPOT_ACCESS_TOKEN: !Ref HubSpotAccessToken
          HUBSPOT_PORTAL_ID: !Ref HubSpotPortalId
          GOOGLE_API_KEY: !Ref GoogleApiKey
          GOOGLE_SPREADSHEET_ID: !Ref GoogleSpreadsheetId

  # Cache Table
  CacheTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: legal-info-cache
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: cacheKey
          AttributeType: S
      KeySchema:
        - AttributeName: cacheKey
          KeyType: HASH
      TimeToLiveSpecification:
        AttributeName: ttl
        Enabled: true

  # API Gateway
  LegalInfoApi:
    Type: AWS::Serverless::Api
    Properties:
      StageName: prod
      Cors:
        AllowMethods: "'GET,POST,OPTIONS'"
        AllowHeaders: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'"
        AllowOrigin: "'*'"

  # CloudFront Distribution
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - Id: ApiGateway
            DomainName: !Sub "${LegalInfoApi}.execute-api.${AWS::Region}.amazonaws.com"
            CustomOriginConfig:
              HTTPPort: 443
              OriginProtocolPolicy: https-only
        DefaultCacheBehavior:
          TargetOriginId: ApiGateway
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad # CachingDisabled
        Enabled: true
        PriceClass: PriceClass_100

Parameters:
  OpenAIApiKey:
    Type: String
    NoEcho: true
  HubSpotAccessToken:
    Type: String
    NoEcho: true
  HubSpotPortalId:
    Type: String
  GoogleApiKey:
    Type: String
    NoEcho: true
  GoogleSpreadsheetId:
    Type: String

Outputs:
  ApiUrl:
    Description: "API Gateway endpoint URL"
    Value: !Sub "https://${LegalInfoApi}.execute-api.${AWS::Region}.amazonaws.com/prod/"
  CloudFrontUrl:
    Description: "CloudFront distribution URL"
    Value: !Sub "https://${CloudFrontDistribution.DomainName}/"
```

### Step 4: Convert Express App to Lambda
Create `server.js` (Lambda handler):

```javascript
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import OpenAI from 'openai';
import { DataIntegrationService } from './data-integration-service.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const dataService = new DataIntegrationService();

// Your existing routes here
app.post('/api/chat', async (req, res) => {
  // Your existing chat logic
});

app.get('/api/articles', async (req, res) => {
  // Your existing articles logic
});

// Export for Lambda
export const handler = serverless(app);
```

### Step 5: Deploy
```bash
# Build and deploy
sam build
sam deploy --guided

# Enter your API keys when prompted
```

## 🔧 Phase 2: Performance Optimization

### Step 1: Add Caching Layer
```javascript
// Enhanced data integration with DynamoDB caching
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamoClient = new DynamoDBDocumentClient(new DynamoDBClient());

export class DataIntegrationService {
  async getCachedData(key, ttl = 300) {
    try {
      const result = await dynamoClient.send(new GetCommand({
        TableName: 'legal-info-cache',
        Key: { cacheKey: key }
      }));
      
      if (result.Item && result.Item.ttl > Date.now() / 1000) {
        return result.Item.data;
      }
    } catch (error) {
      console.warn('Cache read failed:', error);
    }
    return null;
  }

  async setCachedData(key, data, ttl = 300) {
    try {
      await dynamoClient.send(new PutCommand({
        TableName: 'legal-info-cache',
        Item: {
          cacheKey: key,
          data: data,
          ttl: Math.floor(Date.now() / 1000) + ttl
        }
      }));
    } catch (error) {
      console.warn('Cache write failed:', error);
    }
  }
}
```

### Step 2: Add CloudFront Caching
```yaml
# Enhanced CloudFront configuration
CloudFrontDistribution:
  Type: AWS::CloudFront::Distribution
  Properties:
    DistributionConfig:
      Origins:
        - Id: ApiGateway
          DomainName: !Sub "${LegalInfoApi}.execute-api.${AWS::Region}.amazonaws.com"
          CustomOriginConfig:
            HTTPPort: 443
            OriginProtocolPolicy: https-only
      DefaultCacheBehavior:
        TargetOriginId: ApiGateway
        ViewerProtocolPolicy: redirect-to-https
        CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad
        ResponseHeadersPolicyId: 67f7725c-6f97-4210-82d7-5512b31e9d03
      CacheBehaviors:
        - PathPattern: "/api/articles"
          TargetOriginId: ApiGateway
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6 # CachingOptimized
          ResponseHeadersPolicyId: 67f7725c-6f97-4210-82d7-5512b31e9d03
        - PathPattern: "/api/law-firms"
          TargetOriginId: ApiGateway
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6
          ResponseHeadersPolicyId: 67f7725c-6f97-4210-82d7-5512b31e9d03
```

## 📊 Phase 3: Monitoring & Analytics

### Step 1: CloudWatch Setup
```yaml
# Add to template.yaml
  # CloudWatch Dashboard
  MonitoringDashboard:
    Type: AWS::CloudWatch::Dashboard
    Properties:
      DashboardName: LegalPlatform-Monitoring
      DashboardBody: !Sub |
        {
          "widgets": [
            {
              "type": "metric",
              "properties": {
                "metrics": [
                  ["AWS/ApiGateway", "Count", "ApiName", "${LegalInfoApi}"],
                  [".", "4XXError", ".", "."],
                  [".", "5XXError", ".", "."]
                ],
                "period": 300,
                "stat": "Sum",
                "region": "${AWS::Region}",
                "title": "API Gateway Metrics"
              }
            },
            {
              "type": "metric",
              "properties": {
                "metrics": [
                  ["AWS/Lambda", "Duration", "FunctionName", "${LegalInfoAPI}"],
                  [".", "Errors", ".", "."],
                  [".", "Throttles", ".", "."]
                ],
                "period": 300,
                "stat": "Average",
                "region": "${AWS::Region}",
                "title": "Lambda Performance"
              }
            }
          ]
        }

  # CloudWatch Alarms
  HighErrorRateAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: LegalPlatform-HighErrorRate
      MetricName: 5XXError
      Namespace: AWS/ApiGateway
      Statistic: Sum
      Period: 300
      EvaluationPeriods: 2
      Threshold: 10
      ComparisonOperator: GreaterThanThreshold

  # SNS Topic for alerts
  SNSTopic:
    Type: AWS::SNS::Topic
    Properties:
      TopicName: LegalPlatform-Alerts
```

### Step 2: Application Performance Monitoring
```javascript
// Add AWS X-Ray for tracing
import AWSXRay from 'aws-xray-sdk-core';
import AWSXRayCapture from 'aws-xray-sdk-express';

// Initialize X-Ray
AWSXRay.captureAWS(require('aws-sdk'));

// Add to your Express app
app.use(AWSXRayCapture.express.openSegment('LegalPlatform'));

// Close segment at end of request
app.use(AWSXRayCapture.express.closeSegment());
```

## 💰 Phase 4: Cost Optimization

### Step 1: Reserved Concurrency
```yaml
# Add to Lambda function
LegalInfoAPI:
  Type: AWS::Serverless::Function
  Properties:
    ReservedConcurrencyLimit: 100  # Adjust based on expected traffic
    MemorySize: 1024  # Optimize for your workload
```

### Step 2: Auto-scaling Policies
```yaml
# Add CloudWatch alarms for auto-scaling
  HighCPUAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: LegalPlatform-HighCPU
      MetricName: CPUUtilization
      Namespace: AWS/Lambda
      Statistic: Average
      Period: 60
      EvaluationPeriods: 2
      Threshold: 70
```

### Step 3: Cost Monitoring
```yaml
# Add billing alerts
  BillingAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: LegalPlatform-MonthlyBilling
      MetricName: EstimatedCharges
      Namespace: AWS/Billing
      Statistic: Maximum
      Period: 86400
      EvaluationPeriods: 1
      Threshold: 100  # $100 threshold
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - !Ref SNSTopic
```

## 🚀 Phase 5: High-Traffic Preparation

### Step 1: Multi-Region Setup
```yaml
# Deploy to multiple regions for global performance
# Create separate stacks for each region
# Use Route 53 for global load balancing
```

### Step 2: Database Scaling (if needed)
```yaml
# Add Aurora Serverless for database needs
  DatabaseCluster:
    Type: AWS::RDS::DBCluster
    Properties:
      Engine: aurora-postgresql
      EngineMode: serverless
      ScalingConfiguration:
        MinCapacity: 2
        MaxCapacity: 16
        AutoPause: true
        SecondsUntilAutoPause: 300
```

### Step 3: Advanced Caching
```yaml
# Add ElastiCache for Redis
  RedisCluster:
    Type: AWS::ElastiCache::CacheCluster
    Properties:
      Engine: redis
      CacheNodeType: cache.t3.micro
      NumCacheNodes: 1
      Port: 6379
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] AWS account with billing alerts
- [ ] IAM user with appropriate permissions
- [ ] All API keys ready
- [ ] Domain name registered (optional)
- [ ] SSL certificate (handled by AWS)

### Deployment
- [ ] Deploy with SAM
- [ ] Test all endpoints
- [ ] Configure CloudWatch monitoring
- [ ] Set up billing alerts
- [ ] Test auto-scaling

### Post-Deployment
- [ ] Monitor costs for first week
- [ ] Adjust reserved concurrency
- [ ] Set up custom domain (if needed)
- [ ] Configure HubSpot integration
- [ ] Load test critical endpoints

## 🎯 Traffic Scaling Strategy

### Traffic Levels & Actions

**1K-10K users/month:**
- Basic Lambda + API Gateway setup
- CloudFront for caching
- Basic monitoring

**10K-100K users/month:**
- Add DynamoDB caching
- Reserved concurrency
- Enhanced monitoring

**100K-1M users/month:**
- Multi-region deployment
- Advanced caching strategies
- Auto-scaling policies

**1M+ users/month:**
- Database scaling
- Advanced monitoring
- Cost optimization strategies

## 💡 Cost Optimization Tips

1. **Use Lambda Provisioned Concurrency** for predictable traffic
2. **Cache aggressively** with CloudFront and DynamoDB
3. **Monitor and optimize** Lambda memory allocation
4. **Use S3 for static assets** instead of Lambda
5. **Set up billing alerts** to avoid surprises

---

**This AWS setup will handle your high-traffic paid marketing campaigns efficiently while keeping costs predictable and performance optimal.** 