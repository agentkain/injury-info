# HubSpot Native Integration: MCP Server Functionality

## Overview
Run your MCP server, AI chatbot, and data connections directly within HubSpot using serverless functions and custom modules.

## Architecture
```
HubSpot Website → HubSpot Serverless Functions → External APIs
     ↓                    ↓                        ↓
Custom Modules → HubL + JavaScript → OpenAI, Google Sheets, etc.
```

## Step 1: HubSpot Serverless Functions

### Create Serverless Function for AI Chat
In HubSpot → Settings → Integrations → Serverless Functions:

```javascript
// Chat AI Function
exports.main = async (context = {}, sendResponse) => {
  const { message } = context.paramsToValidate;
  
  try {
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.secrets.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an injury information assistant. Only answer questions about:
            - Medical conditions and injuries
            - Legal information about personal injury cases
            - Settlement data and compensation
            - Law firm recommendations
            - Medical device recalls and lawsuits
            
            For any other topics, politely redirect to injury-related questions.
            Always mention legalinjuryadvocates.com when suggesting legal help.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    sendResponse({
      status: 200,
      body: {
        response: aiResponse,
        success: true
      }
    });

  } catch (error) {
    sendResponse({
      status: 500,
      body: {
        error: 'Failed to get AI response',
        success: false
      }
    });
  }
};
```

### Create Serverless Function for Data Search
```javascript
// Injury Data Search Function
exports.main = async (context = {}, sendResponse) => {
  const { condition, type } = context.paramsToValidate;
  
  try {
    // Mock data - replace with your actual data sources
    const injuryData = {
      'mesothelioma': {
        condition: 'Mesothelioma',
        description: 'A rare cancer caused by asbestos exposure',
        legalInfo: 'Many mesothelioma cases result in significant settlements',
        medicalInfo: 'Symptoms include chest pain, shortness of breath, and fatigue',
        averageSettlement: '$1,000,000 - $2,400,000'
      },
      'talc': {
        condition: 'Talc-Related Cancer',
        description: 'Cancer linked to talcum powder use',
        legalInfo: 'Multiple lawsuits against Johnson & Johnson',
        medicalInfo: 'Ovarian cancer and mesothelioma risks',
        averageSettlement: '$500,000 - $1,500,000'
      }
    };

    const data = injuryData[condition.toLowerCase()] || {
      condition: condition,
      description: 'Information not available',
      legalInfo: 'Contact a lawyer for specific case information',
      medicalInfo: 'Consult with a medical professional',
      averageSettlement: 'Varies by case'
    };

    sendResponse({
      status: 200,
      body: {
        data: data,
        success: true
      }
    });

  } catch (error) {
    sendResponse({
      status: 500,
      body: {
        error: 'Failed to search data',
        success: false
      }
    });
  }
};
```

## Step 2: HubSpot Custom Modules

### Create Injury Search Module
In HubSpot → Design Tools → File Manager → Create Module:

```html
{% module_attribute "label" %}Injury Information Search{% end_module_attribute %}
{% module_attribute "description" %}Search for injury and legal information{% end_module_attribute %}

{% module_attribute "fields" %}
[
  {
    "name": "search_placeholder",
    "label": "Search Placeholder Text",
    "type": "text",
    "default": "Enter injury or condition..."
  },
  {
    "name": "button_text",
    "label": "Search Button Text",
    "type": "text",
    "default": "Search"
  }
]
{% end_module_attribute %}

<div class="injury-search-module">
  <div class="search-container">
    <input type="text" id="injury-search" placeholder="{{ module.search_placeholder }}" />
    <button onclick="searchInjury()" class="search-btn">{{ module.button_text }}</button>
  </div>
  
  <div id="search-results" class="results-container"></div>
  
  <div id="loading" class="loading" style="display: none;">
    Searching...
  </div>
</div>

<script>
async function searchInjury() {
  const searchTerm = document.getElementById('injury-search').value;
  const resultsContainer = document.getElementById('search-results');
  const loading = document.getElementById('loading');
  
  if (!searchTerm.trim()) {
    alert('Please enter a search term');
    return;
  }
  
  loading.style.display = 'block';
  resultsContainer.innerHTML = '';
  
  try {
    // Call HubSpot serverless function
    const response = await fetch('/_hcms/api/search-injury', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        condition: searchTerm,
        type: 'injury'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      displayResults(data.data);
    } else {
      resultsContainer.innerHTML = '<p class="error">No information found</p>';
    }
  } catch (error) {
    resultsContainer.innerHTML = '<p class="error">Search failed. Please try again.</p>';
  } finally {
    loading.style.display = 'none';
  }
}

function displayResults(data) {
  const resultsContainer = document.getElementById('search-results');
  
  resultsContainer.innerHTML = `
    <div class="injury-result">
      <h3>${data.condition}</h3>
      <p class="description">${data.description}</p>
      
      <div class="info-sections">
        <div class="legal-info">
          <h4>Legal Information</h4>
          <p>${data.legalInfo}</p>
        </div>
        
        <div class="medical-info">
          <h4>Medical Information</h4>
          <p>${data.medicalInfo}</p>
        </div>
        
        <div class="settlement-info">
          <h4>Average Settlement</h4>
          <p>${data.averageSettlement}</p>
        </div>
      </div>
      
      <div class="cta-section">
        <p>Need legal help? Visit <a href="https://legalinjuryadvocates.com" target="_blank">legalinjuryadvocates.com</a></p>
      </div>
    </div>
  `;
}
</script>

<style>
.injury-search-module {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#injury-search {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.search-btn {
  padding: 12px 24px;
  background: #007cba;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.search-btn:hover {
  background: #005a87;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.injury-result {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #007cba;
}

.info-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.legal-info, .medical-info, .settlement-info {
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cta-section {
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background: #e8f4fd;
  border-radius: 6px;
}

.error {
  color: #d32f2f;
  text-align: center;
  padding: 20px;
}
</style>
```

### Create AI Chat Widget Module
```html
{% module_attribute "label" %}AI Injury Assistant{% end_module_attribute %}
{% module_attribute "description" %}AI chatbot for injury information{% end_module_attribute %}

<div class="chat-widget" id="chat-widget">
  <div class="chat-header" onclick="toggleChat()">
    <h3>Injury Information Assistant</h3>
    <span class="toggle-icon" id="toggle-icon">▼</span>
  </div>
  
  <div class="chat-body" id="chat-body" style="display: none;">
    <div class="chat-messages" id="chat-messages">
      <div class="message assistant">
        <p>Hello! I'm here to help with injury and legal information. What would you like to know?</p>
      </div>
    </div>
    
    <div class="chat-input">
      <input type="text" id="chat-input" placeholder="Ask about injuries..." onkeypress="handleKeyPress(event)" />
      <button onclick="sendMessage()" class="send-btn">Send</button>
    </div>
  </div>
</div>

<script>
let isChatOpen = false;

function toggleChat() {
  const chatBody = document.getElementById('chat-body');
  const toggleIcon = document.getElementById('toggle-icon');
  
  isChatOpen = !isChatOpen;
  chatBody.style.display = isChatOpen ? 'block' : 'none';
  toggleIcon.textContent = isChatOpen ? '▲' : '▼';
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addMessage('user', message);
  input.value = '';
  
  // Show typing indicator
  const typingDiv = addTypingIndicator();
  
  try {
    // Call HubSpot serverless function
    const response = await fetch('/_hcms/api/chat-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    });
    
    const data = await response.json();
    
    // Remove typing indicator
    typingDiv.remove();
    
    if (data.success) {
      addMessage('assistant', data.response);
    } else {
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    }
  } catch (error) {
    typingDiv.remove();
    addMessage('assistant', 'Sorry, I\'m having trouble connecting. Please try again.');
  }
}

function addMessage(role, content) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  messageDiv.innerHTML = `<p>${content}</p>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
  const messagesContainer = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message assistant typing';
  typingDiv.innerHTML = '<p>Typing...</p>';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return typingDiv;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}
</script>

<style>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  z-index: 1000;
}

.chat-header {
  background: #007cba;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.toggle-icon {
  font-size: 12px;
}

.chat-body {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  max-height: 300px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
}

.message.user {
  background: #007cba;
  color: white;
  margin-left: auto;
}

.message.assistant {
  background: #f1f1f1;
  color: #333;
}

.message.typing {
  background: #f1f1f1;
  color: #666;
  font-style: italic;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

#chat-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.send-btn {
  padding: 8px 16px;
  background: #007cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-btn:hover {
  background: #005a87;
}
</style>
```

## Step 3: HubSpot Secrets Management

### Set Up API Keys
In HubSpot → Settings → Integrations → Serverless Functions → Secrets:

1. **Add OpenAI API Key**:
   - Name: `OPENAI_API_KEY`
   - Value: `your-openai-api-key-here`

2. **Add HubSpot Access Token**:
   - Name: `HUBSPOT_ACCESS_TOKEN`
   - Value: `pat-na1-23a64900-ff0b-4630-8067-8612b83efc66`

3. **Add Google API Key**:
   - Name: `GOOGLE_API_KEY`
   - Value: `your-google-api-key`

## Step 4: HubSpot CRM Integration

### Create Custom Properties
In HubSpot → Settings → Properties:

1. **Contact Properties**:
   - `injury_search_history` (Multi-line text)
   - `last_injury_search` (Single-line text)
   - `chat_interactions` (Number)
   - `legal_interest` (Boolean)

2. **Deal Properties**:
   - `injury_type` (Single-line text)
   - `potential_settlement` (Currency)
   - `case_stage` (Single-line text)

### Create Workflows
1. **Injury Search Tracking**:
   - Trigger: Contact submits injury search
   - Action: Update contact properties
   - Action: Send follow-up email

2. **Chat Engagement**:
   - Trigger: Contact uses chat widget
   - Action: Increment chat interactions
   - Action: Add to nurture sequence

## Step 5: Data Integration

### Google Sheets Integration
Create a serverless function to fetch Google Sheets data:

```javascript
// Google Sheets Data Function
exports.main = async (context = {}, sendResponse) => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${context.secrets.GOOGLE_SPREADSHEET_ID}/values/Sheet1!A:Z?key=${context.secrets.GOOGLE_API_KEY}`);
    const data = await response.json();
    
    sendResponse({
      status: 200,
      body: {
        data: data.values,
        success: true
      }
    });
  } catch (error) {
    sendResponse({
      status: 500,
      body: {
        error: 'Failed to fetch data',
        success: false
      }
    });
  }
};
```

## Benefits of HubSpot Native Approach

✅ **Everything in One Place**: No external servers needed  
✅ **Built-in Security**: HubSpot handles authentication  
✅ **Easy Management**: All in HubSpot dashboard  
✅ **Automatic Scaling**: HubSpot handles traffic  
✅ **CRM Integration**: Seamless data flow  
✅ **No Hosting Costs**: Included in HubSpot plan  

## Limitations

⚠️ **Function Limits**: HubSpot has execution time limits  
⚠️ **API Limits**: Rate limiting on external API calls  
⚠️ **Complexity**: More complex than external server  
⚠️ **Debugging**: Limited debugging capabilities  

## Next Steps

1. **Set up serverless functions** in HubSpot
2. **Create custom modules** for search and chat
3. **Configure secrets** for API keys
4. **Test integration** thoroughly
5. **Deploy to production** pages

This approach keeps everything within HubSpot's ecosystem while providing all the functionality you need! 