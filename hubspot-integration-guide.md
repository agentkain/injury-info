# HubSpot Integration Guide for MCP Server

## Overview
This guide explains how to integrate your deployed MCP server with a HubSpot website to create a powerful injury information platform.

## Architecture

```
GitHub Repository → Vercel/Railway Deployment → HubSpot Website
     ↓                      ↓                        ↓
MCP Server Code    →   HTTPS API Endpoints   →   HubSpot CMS Interface
```

## Step 1: Deploy MCP Server

### Option A: Vercel Deployment
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard:
   - `HUBSPOT_ACCESS_TOKEN`
   - `HUBSPOT_PORTAL_ID`
   - `GOOGLE_API_KEY`
   - `GOOGLE_SPREADSHEET_ID`
   - `OPENAI_API_KEY`
4. Deploy - your server will be available at `https://your-app.vercel.app`

### Option B: Railway Deployment
1. Push your code to GitHub
2. Connect your GitHub repo to Railway
3. Set environment variables in Railway dashboard
4. Deploy - your server will be available at `https://your-app.railway.app`

## Step 2: HubSpot Website Setup

### Create HubSpot Website
1. **HubSpot CMS Hub**: Set up a CMS Hub account
2. **Custom Domain**: Configure your domain (optional)
3. **SSL Certificate**: Automatically provided by HubSpot

### Build the Interface
1. **Landing Pages**: Create injury information landing pages
2. **Blog Articles**: Set up blog for medical/legal content
3. **Contact Forms**: Create forms for user inquiries
4. **Chat Widget**: Integrate with your MCP server chatbot

## Step 3: API Integration

### HubSpot Custom Code Module
Add this JavaScript to your HubSpot pages:

```javascript
// MCP Server API Integration
class InjuryInfoAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || 'https://your-app.vercel.app';
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

// Initialize API
const injuryAPI = new InjuryInfoAPI();
```

### HubSpot Custom Module Template
Create a custom module in HubSpot:

```html
{% module_attribute "label" %}Injury Info Search{% end_module_attribute %}
{% module_attribute "description" %}Search for injury information and legal resources{% end_module_attribute %}

<div class="injury-info-search">
  <input type="text" id="condition-search" placeholder="Enter injury or condition...">
  <button onclick="searchCondition()">Search</button>
  <div id="search-results"></div>
</div>

<script>
async function searchCondition() {
  const condition = document.getElementById('condition-search').value;
  const results = await injuryAPI.searchCondition(condition);
  
  if (results) {
    displayResults(results);
  }
}

function displayResults(data) {
  const container = document.getElementById('search-results');
  container.innerHTML = `
    <h3>${data.condition}</h3>
    <p>${data.description}</p>
    <h4>Legal Information</h4>
    <p>${data.legalInfo}</p>
    <h4>Medical Information</h4>
    <p>${data.medicalInfo}</p>
  `;
}
</script>
```

## Step 4: Chatbot Integration

### HubSpot Chat Widget
1. **Custom Chat Widget**: Create a custom chat widget in HubSpot
2. **API Integration**: Connect to your MCP server's `/api/chat` endpoint
3. **Styling**: Customize the widget to match your brand

### Chat Widget Code
```javascript
// HubSpot Chat Widget Integration
window.addEventListener('load', function() {
  // Initialize chat widget
  const chatWidget = {
    isOpen: false,
    messages: [],
    
    init() {
      this.createWidget();
      this.bindEvents();
    },
    
    createWidget() {
      const widget = document.createElement('div');
      widget.id = 'injury-chat-widget';
      widget.innerHTML = `
        <div class="chat-header">
          <h3>Injury Information Assistant</h3>
          <button id="chat-toggle">×</button>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input">
          <input type="text" id="chat-input" placeholder="Ask about injuries...">
          <button id="chat-send">Send</button>
        </div>
      `;
      document.body.appendChild(widget);
    },
    
    async sendMessage(message) {
      const response = await injuryAPI.chatWithAI(message);
      if (response && response.response) {
        this.addMessage('assistant', response.response);
      }
    },
    
    addMessage(role, content) {
      const messagesContainer = document.getElementById('chat-messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${role}`;
      messageDiv.textContent = content;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };
  
  chatWidget.init();
});
```

## Step 5: Data Synchronization

### HubSpot CRM Integration
1. **Custom Properties**: Use your existing HubSpot custom properties
2. **Contact Sync**: Sync user interactions with HubSpot contacts
3. **Lead Scoring**: Automatically score leads based on injury searches

### Automated Workflows
1. **Lead Nurturing**: Create workflows based on injury searches
2. **Email Campaigns**: Send relevant legal/medical information
3. **Follow-up Sequences**: Automate follow-up based on user behavior

## Step 6: Analytics & Tracking

### HubSpot Analytics
1. **Page Views**: Track which injury pages are most popular
2. **Form Submissions**: Monitor contact form submissions
3. **Chat Interactions**: Track chatbot usage and effectiveness

### Custom Events
```javascript
// Track custom events in HubSpot
window.addEventListener('injury-search', function(e) {
  if (window._hsq) {
    window._hsq.push(['trackEvent', {
      id: 'injury_search',
      value: e.detail.condition
    }]);
  }
});
```

## Benefits of This Architecture

✅ **Scalable**: Serverless deployment handles traffic spikes  
✅ **Secure**: HTTPS endpoints with proper authentication  
✅ **Integrated**: Seamless HubSpot CRM integration  
✅ **Maintainable**: Code hosted on GitHub with version control  
✅ **Cost-Effective**: Pay-per-use serverless pricing  
✅ **Fast**: Global CDN distribution  

## Environment Variables

Make sure to set these in your deployment platform:

```bash
HUBSPOT_ACCESS_TOKEN=pat-na1-23a64900-ff0b-4630-8067-8612b83efc66
HUBSPOT_PORTAL_ID=45899920
GOOGLE_API_KEY=your-google-api-key
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=production
```

## Testing Your Integration

1. **API Testing**: Use the `/api/test` endpoint to verify connectivity
2. **HubSpot Testing**: Test the custom modules in HubSpot preview mode
3. **Chat Testing**: Verify chatbot responses in the live environment
4. **Data Flow**: Confirm data is flowing between systems correctly

## Support & Maintenance

- **Monitoring**: Use deployment platform monitoring tools
- **Logs**: Check server logs for errors and performance
- **Updates**: Deploy updates by pushing to GitHub
- **Backup**: HubSpot automatically backs up your website data 