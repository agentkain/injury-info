# Project Organization - Legal Injury Information Platform

## 📋 Document Overview

This document provides a comprehensive overview of the Legal Injury Information Platform project, organized for easy developer handoff and understanding.

## 🚀 Project Summary

**Purpose**: AI-powered legal injury information platform that helps users find legal resources, understand medical conditions, and connect with appropriate law firms.

**Key Technologies**: 
- Node.js/Express backend
- OpenAI GPT-4 integration
- HubSpot CRM integration
- Google Sheets data source
- Vanilla JavaScript frontend

**Status**: Production-ready with comprehensive error handling and fallback systems

## 📚 Documentation Index

### 🔧 Setup & Configuration
| Document | Purpose | Priority |
|----------|---------|----------|
| [DEVELOPER-HANDOFF.md](./DEVELOPER-HANDOFF.md) | Complete project overview | **HIGH** |
| [HUBSPOT-SETUP-GUIDE.md](./HUBSPOT-SETUP-GUIDE.md) | HubSpot integration setup | **HIGH** |
| [.env.example](./.env.example) | Environment configuration | **HIGH** |
| [README.md](./README.md) | Basic setup instructions | **MEDIUM** |
| [local-development-setup.md](./local-development-setup.md) | Local development guide | **MEDIUM** |

### 🔌 Integration Guides
| Document | Purpose | Priority |
|----------|---------|----------|
| [DATA-INTEGRATION-GUIDE.md](./DATA-INTEGRATION-GUIDE.md) | Data sources overview | **HIGH** |
| [GOOGLE-SHEETS-LIA-SETUP.md](./GOOGLE-SHEETS-LIA-SETUP.md) | Google Sheets setup | **MEDIUM** |
| [AI-CONFIGURATION.md](./AI-CONFIGURATION.md) | OpenAI configuration | **MEDIUM** |
| [hubspot-integration-guide.md](./hubspot-integration-guide.md) | Legacy HubSpot guide | **LOW** |

### 🚀 Deployment & Operations
| Document | Purpose | Priority |
|----------|---------|----------|
| [deployment-checklist.md](./deployment-checklist.md) | Deployment checklist | **HIGH** |
| [LIA-ACTIVE-CASES-SUMMARY.md](./LIA-ACTIVE-CASES-SUMMARY.md) | LIA cases documentation | **MEDIUM** |

## 🏗️ Code Architecture

### Core Files (Must Understand)
```
src/
├── server.js                    # Main application server
├── data-integration-service.js  # Central data coordinator
├── hubspot-connector.js         # HubSpot API integration
├── server-ai-config.js          # AI configuration
└── index.html                   # Main web interface
```

### Configuration Files
```
├── .env.local                   # Environment variables (create from .env.example)
├── package.json                 # Dependencies and scripts
├── vercel.json                  # Vercel deployment config
└── railway.json                 # Railway deployment config
```

### Data Integration Layer
```
├── google-sheets-connector.js   # Google Sheets API
├── database-connector.js        # Database operations
└── scripts/                     # Utility scripts
```

## 🔑 API Keys Required

### HubSpot
- **Access Token**: Private app access token
- **Portal ID**: Your HubSpot portal ID
- **Setup Guide**: [HUBSPOT-SETUP-GUIDE.md](./HUBSPOT-SETUP-GUIDE.md)

### Google Sheets
- **API Key**: Google Cloud API key
- **Spreadsheet ID**: Target spreadsheet ID
- **Setup Guide**: [GOOGLE-SHEETS-LIA-SETUP.md](./GOOGLE-SHEETS-LIA-SETUP.md)

### OpenAI
- **API Key**: OpenAI platform API key
- **Model**: GPT-4 (configurable)
- **Setup Guide**: [AI-CONFIGURATION.md](./AI-CONFIGURATION.md)

## 📊 API Endpoints Summary

### Essential Endpoints
- `GET /api/config/status` - Check configuration
- `POST /api/chat` - AI chat functionality
- `GET /api/test` - Test OpenAI connection
- `GET /health` - Health check

### Data Endpoints
- `GET /api/articles` - Get all articles
- `GET /api/law-firms` - Search law firms
- `GET /api/settlements` - Get settlement data
- `GET /api/search/:condition` - Search conditions

### LIA Specific
- `GET /api/lia/active-cases` - Get active cases
- `POST /api/lia/check-case` - Check case relevance

## 🧪 Testing Strategy

### Quick Tests
```bash
# Start server
npm start

# Test configuration
curl http://localhost:3000/api/config/status

# Test AI connection
curl http://localhost:3000/api/test

# Test data endpoints
curl http://localhost:3000/api/articles
```

### Full Integration Test
1. Configure all API keys
2. Start server
3. Visit http://localhost:3000
4. Test search functionality
5. Test AI chat feature
6. Verify data loading

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

### Railway
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

### Other Platforms
- Compatible with any Node.js hosting
- Requires environment variable support
- No database required (uses external APIs)

## 🔧 Development Workflow

### Initial Setup
1. **Read Documentation**: Start with [DEVELOPER-HANDOFF.md](./DEVELOPER-HANDOFF.md)
2. **Configure Environment**: Copy [.env.example](./.env.example) to `.env.local`
3. **Set up HubSpot**: Follow [HUBSPOT-SETUP-GUIDE.md](./HUBSPOT-SETUP-GUIDE.md)
4. **Test Locally**: Run `npm start` and test endpoints

### Making Changes
1. **Data Layer**: Modify `data-integration-service.js` for data flow changes
2. **AI Behavior**: Update `server-ai-config.js` for AI configuration
3. **UI Changes**: Modify `index.html` and related files
4. **API Changes**: Update `server.js` for new endpoints

### Deployment
1. **Test Locally**: Ensure all functionality works
2. **Check Configuration**: Verify all API keys are set
3. **Deploy**: Push to chosen platform
4. **Monitor**: Check logs and API usage

## 🚨 Common Issues & Solutions

### "API key not valid"
- **Solution**: Verify API keys in `.env.local`
- **Check**: API key permissions and scopes
- **Monitor**: API usage and billing

### "Google Sheets request failed"
- **Solution**: Verify Google API key and spreadsheet ID
- **Check**: Spreadsheet sharing permissions
- **Alternative**: Uses fallback data if Google Sheets fails

### "Address already in use"
- **Solution**: Stop existing server with `Ctrl+C`
- **Check**: Other processes using port 3000
- **Alternative**: Change port in `.env.local`

## 📞 Support & Resources

### Internal Resources
- All documentation in this repository
- Code comments and inline documentation
- Error logs and debugging information

### External Resources
- [HubSpot Developer Documentation](https://developers.hubspot.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Sheets API Documentation](https://developers.google.com/sheets)

## 🎯 Next Steps for Developer

### Immediate Actions
1. **Review [DEVELOPER-HANDOFF.md](./DEVELOPER-HANDOFF.md)** - Complete project overview
2. **Follow [HUBSPOT-SETUP-GUIDE.md](./HUBSPOT-SETUP-GUIDE.md)** - Set up HubSpot integration
3. **Configure Environment** - Set up `.env.local` with all API keys
4. **Test Locally** - Verify all functionality works

### Medium Term
1. **Customize Data Sources** - Add your actual law firm and case data
2. **Optimize AI Responses** - Refine system messages and prompts
3. **Deploy to Production** - Choose deployment platform and go live
4. **Monitor Performance** - Set up logging and monitoring

### Long Term
1. **Expand Integrations** - Add more data sources as needed
2. **Enhance UI/UX** - Improve user interface and experience
3. **Add Analytics** - Implement tracking and reporting
4. **Scale Infrastructure** - Optimize for higher traffic

---

**This project is well-documented, production-ready, and designed for easy maintenance and expansion.** 