# Quick Start Guide - Legal Injury Information Platform

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- API keys for HubSpot, Google Sheets, and OpenAI

### Step 1: Clone & Install
```bash
# Clone the repository
git clone <repository-url>
cd src

# Install dependencies
npm install
```

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
# Required variables:
# - HUBSPOT_ACCESS_TOKEN
# - HUBSPOT_PORTAL_ID
# - GOOGLE_API_KEY
# - GOOGLE_SPREADSHEET_ID
# - OPENAI_API_KEY
```

### Step 3: Start Server
```bash
# Start the development server
npm start

# Server will run on http://localhost:3000
```

### Step 4: Test Integration
```bash
# Test configuration status
curl http://localhost:3000/api/config/status

# Test OpenAI connection
curl http://localhost:3000/api/test

# Test web interface
# Visit: http://localhost:3000
```

## 📋 Essential Commands

### Development
```bash
npm start          # Start production server
npm run dev        # Start development server (auto-reload)
npm run test-api   # Test API endpoints
```

### Testing API Endpoints
```bash
# Configuration check
curl http://localhost:3000/api/config/status

# OpenAI test
curl http://localhost:3000/api/test

# Chat test
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is mesothelioma?"}'

# Get articles
curl http://localhost:3000/api/articles

# Search law firms
curl "http://localhost:3000/api/law-firms?specialty=Mesothelioma"
```

## 🔧 Configuration Check

### All Systems Green
If `/api/config/status` returns:
```json
{
  "openai": { "configured": true },
  "google": { "configured": true },
  "hubspot": { "configured": true },
  "validation": { "isValid": true }
}
```

### Troubleshooting
If any service shows `"configured": false`:
1. Check API keys in `.env.local`
2. Verify API key permissions
3. Restart server after changes

## 📊 Key Endpoints

### Essential
- `GET /` - Main web interface
- `GET /api/config/status` - Check configuration
- `POST /api/chat` - AI chat (main feature)
- `GET /health` - Health check

### Data Access
- `GET /api/articles` - All articles
- `GET /api/law-firms` - Search law firms
- `GET /api/settlements` - Settlement data
- `GET /api/search/:condition` - Search conditions

## 🎯 Next Steps

### For Immediate Testing
1. **Test the web interface** at `http://localhost:3000`
2. **Try the chat feature** with legal questions
3. **Check the article search** functionality

### For Production Setup
1. **Read [HUBSPOT-SETUP-GUIDE.md](./HUBSPOT-SETUP-GUIDE.md)** for HubSpot integration
2. **Review [DEVELOPER-HANDOFF.md](./DEVELOPER-HANDOFF.md)** for complete overview
3. **Configure deployment** using Vercel or Railway

### For Development
1. **Explore the codebase** starting with `server.js`
2. **Review data integration** in `data-integration-service.js`
3. **Customize AI responses** in `server-ai-config.js`

## 🚨 Common Issues

### "API key not valid"
- Check API keys in `.env.local`
- Verify API key permissions
- Restart server after changes

### "Address already in use"
- Stop existing server: `Ctrl+C`
- Check for other processes: `netstat -ano | findstr :3000`
- Change port in `.env.local`: `PORT=3001`

### "Google Sheets request failed"
- Verify Google API key
- Check spreadsheet ID
- Ensure spreadsheet is publicly viewable
- **Note**: System uses fallback data if Google Sheets fails

## 📞 Need Help?

1. **Check the logs** in your terminal
2. **Review documentation** in the repository
3. **Test individual endpoints** to isolate issues
4. **Verify all API keys** are correct and active

---

**Ready to go! 🚀 Your legal injury information platform is now running.** 