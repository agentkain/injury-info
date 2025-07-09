# Local MCP Server → HubSpot Integration

## Overview
Run your MCP server locally and expose it to the internet so your HubSpot website can access it.

## Architecture
```
Local MCP Server → ngrok → Internet → HubSpot Website
     ↓              ↓         ↓           ↓
localhost:3000 → Public URL → HTTPS → API Calls
```

## Step 1: Run MCP Server Locally

### Start Your Server
```bash
# Navigate to your project directory
cd /path/to/your/mcp-server-project

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

Your server will run at: `http://localhost:3000`

### Test Local Server
```bash
# Test the API endpoint
curl http://localhost:3000/api/test
```

Should return: `{"success":true,"message":"OpenAI API connection successful"}`

## Step 2: Expose Local Server with ngrok

### Install ngrok
```bash
# Using npm (recommended)
npm install -g ngrok

# Or download from https://ngrok.com/download
```

### Create ngrok Account
1. Go to [ngrok.com](https://ngrok.com)
2. Sign up for free account
3. Get your authtoken
4. Configure ngrok:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Expose Your Server
```bash
# Expose localhost:3000 to the internet
ngrok http 3000
```

You'll see output like:
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

**Save your ngrok URL**: `https://abc123.ngrok.io`

## Step 3: Update HubSpot Integration

### Update API Base URL
In your HubSpot custom modules, update the base URL:

```javascript
// MCP Server API Integration
class InjuryInfoAPI {
  constructor(baseUrl) {
    // Use your ngrok URL here
    this.baseUrl = baseUrl || 'https://abc123.ngrok.io';
  }

  async searchCondition(condition) {
    try {
      const response = await fetch(`${this.baseUrl}/api/search/${encodeURIComponent(condition)}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  }

  async getLawFirms(specialty, location) {
    try {
      const params = new URLSearchParams({ specialty, location });
      const response = await fetch(`${this.baseUrl}/api/law-firms?${params}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  }

  async chatWithAI(message) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      return await response.json();
    } catch (error) {
      console.error('Chat Error:', error);
      return null;
    }
  }
}

// Initialize API with your ngrok URL
const injuryAPI = new InjuryInfoAPI('https://abc123.ngrok.io');
```

## Step 4: Test the Connection

### Test from HubSpot
Add this test code to your HubSpot page:

```javascript
// Test API connection
async function testConnection() {
  try {
    const response = await fetch('https://abc123.ngrok.io/api/test');
    const data = await response.json();
    console.log('✅ API Connection Successful:', data);
    return true;
  } catch (error) {
    console.error('❌ API Connection Failed:', error);
    return false;
  }
}

// Run test
testConnection();
```

### Test Chat Functionality
```javascript
// Test chatbot
async function testChat() {
  try {
    const response = await fetch('https://abc123.ngrok.io/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: "What is mesothelioma?" 
      })
    });
    const data = await response.json();
    console.log('✅ Chat Response:', data);
    return data;
  } catch (error) {
    console.error('❌ Chat Error:', error);
    return null;
  }
}

// Run chat test
testChat();
```

## Step 5: Development Workflow

### Daily Development Process
1. **Start Local Server**:
   ```bash
   npm start
   ```

2. **Start ngrok** (in new terminal):
   ```bash
   ngrok http 3000
   ```

3. **Update HubSpot** with new ngrok URL (if changed)

4. **Test Integration** in HubSpot

5. **Make Changes** to your MCP server code

6. **Restart Server** (if needed):
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm start
   ```

### ngrok URL Changes
- **Free ngrok**: URL changes each time you restart
- **Paid ngrok**: Can get fixed subdomain
- **Solution**: Update HubSpot with new URL when it changes

## Step 6: Production Considerations

### When to Move to Hosted Solution
Consider moving to Vercel/Railway when:
- ✅ Ready for production launch
- ✅ Need consistent URL
- ✅ Want better reliability
- ✅ Need 24/7 uptime

### Migration Path
1. Deploy to Vercel
2. Update HubSpot with new URL
3. Test thoroughly
4. Go live

## Troubleshooting

### Common Issues

**1. ngrok URL Not Working**
```bash
# Check if ngrok is running
curl https://abc123.ngrok.io/api/test

# Restart ngrok if needed
ngrok http 3000
```

**2. CORS Errors**
Your server already has CORS enabled, but if you see CORS errors:
```javascript
// In your server.js, ensure CORS is configured
app.use(cors({
  origin: ['https://your-hubspot-domain.com', 'https://*.hubspot.com'],
  credentials: true
}));
```

**3. Server Not Starting**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 PID_NUMBER

# Start server again
npm start
```

**4. Environment Variables**
Make sure your `.env.local` file has all required variables:
```bash
HUBSPOT_ACCESS_TOKEN=pat-na1-23a64900-ff0b-4630-8067-8612b83efc66
HUBSPOT_PORTAL_ID=45899920
GOOGLE_API_KEY=your-google-api-key
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
OPENAI_API_KEY=your-openai-api-key
```

## Benefits of This Approach

✅ **No Hosting Costs**: Run locally, free ngrok  
✅ **Fast Development**: Instant code changes  
✅ **Full Control**: Complete access to server  
✅ **Easy Debugging**: Direct access to logs  
✅ **Flexible**: Can switch to hosted later  

## Security Considerations

⚠️ **ngrok URLs are public** - anyone can access your API  
⚠️ **Use for development only** - not recommended for production  
⚠️ **Monitor ngrok logs** - check for unexpected traffic  
⚠️ **Keep API keys secure** - don't expose sensitive data  

## Next Steps

1. **Set up ngrok** and get your public URL
2. **Update HubSpot** with the ngrok URL
3. **Test the integration** thoroughly
4. **Develop and iterate** on your MCP server
5. **Plan migration** to hosted solution when ready

This approach gives you the flexibility to develop and test your MCP server locally while still connecting it to your HubSpot website! 