# Developer Handoff - Legal Injury Information Platform

## 🚀 Project Overview

This is a comprehensive legal injury information platform that integrates multiple data sources and AI capabilities to provide intelligent responses about legal cases, medical conditions, and settlement information.

### Key Features
- **AI-Powered Chat**: OpenAI GPT-4 integration for intelligent responses
- **Multi-Source Data Integration**: HubSpot CRM, Google Sheets, and fallback data
- **Legal Information System**: Comprehensive injury and legal case database
- **Real-time API**: RESTful API with multiple endpoints
- **Web Interface**: Complete frontend with search and chat capabilities

### Tech Stack
- **Backend**: Node.js, Express.js
- **AI Integration**: OpenAI GPT-4 API
- **Data Sources**: HubSpot CRM/CMS, Google Sheets API
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Deployment**: Vercel/Railway ready

## 📁 Project Structure

```
src/
├── 🔧 Core Application Files
│   ├── server.js                           # Main Express server
│   ├── index.html                          # Main web interface
│   ├── article.html                        # Article display page
│   ├── mesothelioma.html                   # Specialized mesothelioma page
│   └── package.json                        # Dependencies
│
├── ⚙️ Configuration Files
│   ├── .env.local                          # Environment variables
│   ├── ai-config.js                        # Client-side AI config
│   ├── server-ai-config.js                 # Server-side AI config
│   ├── vercel.json                         # Vercel deployment config
│   └── railway.json                        # Railway deployment config
│
├── 🔌 Integration Services
│   ├── data-integration-service.js         # Central data coordinator
│   ├── hubspot-connector.js                # HubSpot API integration
│   ├── google-sheets-connector.js          # Google Sheets API integration
│   └── database-connector.js               # Database operations
│
├── 📚 Documentation
│   ├── README.md                           # Basic setup guide
│   ├── HUBSPOT-SETUP-GUIDE.md              # HubSpot integration guide
│   ├── GOOGLE-SHEETS-LIA-SETUP.md          # Google Sheets setup
│   ├── AI-CONFIGURATION.md                 # AI configuration guide
│   ├── DATA-INTEGRATION-GUIDE.md           # Data integration guide
│   ├── deployment-checklist.md             # Deployment checklist
│   └── local-development-setup.md          # Local development setup
│
├── 🎨 Assets
│   ├── Injury-Info-logo-*.svg              # Logo files
│   ├── *.webp                              # Image assets
│   └── icon-plus.svg                       # UI icons
│
├── 📜 Scripts & Utilities
│   └── scripts/
│       ├── content-generator.js            # Content generation utilities
│       ├── data-sources-connector.js       # Data source connectors
│       ├── hubspot-setup.js                # HubSpot setup utilities
│       └── sample-data-templates/          # Sample data templates
│
└── 🧪 Testing & Development
    ├── test-api.js                         # API testing utilities
    ├── injury-info-server.js               # Alternative server implementation
    └── hubspot-injury-info-server.js       # HubSpot-specific server
```

## 🔑 Environment Variables

Create a `.env.local` file with these variables:

```env
# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token
HUBSPOT_PORTAL_ID=your_portal_id

# Google Sheets Configuration
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

## 🚀 Quick Start

### 1. Installation
```bash
# Clone the repository
git clone <repository-url>
cd src

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 2. Local Development
```bash
# Start development server
npm run dev

# Or start production server
npm start

# Test API endpoints
npm run test-api
```

### 3. Access the Application
- **Web Interface**: http://localhost:3000
- **API Health Check**: http://localhost:3000/health
- **API Test**: http://localhost:3000/api/test
- **Configuration Status**: http://localhost:3000/api/config/status

## 📊 API Endpoints

### Core Endpoints
- `GET /` - Main web interface
- `GET /health` - Health check
- `GET /api/config/status` - Configuration status

### AI & Chat
- `POST /api/chat` - OpenAI chat completion
- `GET /api/test` - Test OpenAI connection

### Data Endpoints
- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get specific article
- `GET /api/law-firms` - Search law firms
- `GET /api/settlements` - Get settlement data
- `GET /api/search/:condition` - Search condition info

### LIA Integration
- `GET /api/lia/active-cases` - Get LIA active cases
- `POST /api/lia/check-case` - Check if query relates to LIA cases

### Utilities
- `POST /api/cache/clear` - Clear cache

## 🔧 Key Components

### 1. Data Integration Service (`data-integration-service.js`)
- **Purpose**: Central coordinator for all data sources
- **Features**: 
  - Fetches data from HubSpot and Google Sheets
  - Provides fallback data when APIs fail
  - Implements caching for performance
  - Merges data from multiple sources

### 2. HubSpot Connector (`hubspot-connector.js`)
- **Purpose**: Interface with HubSpot CRM/CMS
- **Features**:
  - Search diseases and conditions
  - Find law firms in CRM
  - Get manufacturer case data
  - Track user interactions

### 3. Google Sheets Connector (`google-sheets-connector.js`)
- **Purpose**: Interface with Google Sheets data
- **Features**:
  - Read spreadsheet data
  - Support multiple sheets
  - Error handling and fallback

### 4. AI Configuration (`server-ai-config.js`)
- **Purpose**: Centralized AI configuration
- **Features**:
  - OpenAI API setup
  - System message configuration
  - Error handling
  - Configuration validation

## 🔗 Integration Points

### HubSpot Integration
- **CRM**: Law firm data, case information
- **CMS**: Article content, disease information
- **Properties**: Custom properties for legal data
- **Workflows**: Automated lead processing

### Google Sheets Integration
- **Medical Conditions**: Condition database
- **Legal Cases**: Case information
- **Law Firms**: Attorney database
- **LIA Active Cases**: Active case tracking

### OpenAI Integration
- **Model**: GPT-4 for responses
- **System Messages**: Legal/medical context
- **Safety**: Content filtering and appropriate responses

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Railway Deployment
1. Connect GitHub repository to Railway
2. Configure environment variables in Railway dashboard
3. Deploy automatically on git push

## 🛠️ Development Notes

### Error Handling
- All API calls include comprehensive error handling
- Fallback data ensures the system always works
- Detailed logging for debugging

### Performance
- Caching implemented for data sources
- Efficient API calls with rate limiting consideration
- Optimized data merging and deduplication

### Security
- Environment variables for all sensitive data
- Server-side API key management
- Input validation and sanitization

## 📋 Common Issues & Solutions

### "API key not valid" Error
- Verify API keys in `.env.local`
- Check API key permissions
- Ensure sufficient API credits

### "Address already in use" Error
- Stop existing server: `Ctrl+C`
- Check for running processes: `netstat -ano | findstr :3000`
- Kill process if needed

### Google Sheets Access Issues
- Verify Google API key is valid
- Check spreadsheet permissions
- Ensure spreadsheet ID is correct

## 🎯 Next Steps for Developer

1. **Review Documentation**: Read all `.md` files for context
2. **Test Locally**: Run `npm start` and test all endpoints
3. **Configure APIs**: Set up all API keys and test connections
4. **Deploy**: Choose deployment platform and deploy
5. **Monitor**: Set up monitoring and error tracking

## 📞 Support

For questions or issues:
1. Check the logs in terminal/console
2. Review the specific integration guides
3. Test individual API endpoints
4. Check API key validity and permissions

---

**This platform is production-ready and includes comprehensive error handling, fallback data, and monitoring capabilities.** 