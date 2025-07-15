/**
 * Test script for the new data integration API endpoints
 */

import { SERVER_AI_CONFIG, getConfigurationStatus, validateConfiguration } from './server-ai-config.js';

console.log('🧪 Testing AI Configuration Setup...\n');

// Test 1: Check environment variables
console.log('📋 Step 1: Environment Variables Check');
console.log('================================');

const envVars = {
    'OPENAI_API_KEY': process.env.OPENAI_API_KEY,
    'GOOGLE_API_KEY': process.env.GOOGLE_API_KEY,
    'GOOGLE_SPREADSHEET_ID': process.env.GOOGLE_SPREADSHEET_ID,
    'HUBSPOT_ACCESS_TOKEN': process.env.HUBSPOT_ACCESS_TOKEN,
    'HUBSPOT_PORTAL_ID': process.env.HUBSPOT_PORTAL_ID
};

Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
        console.log(`✅ ${key}: ${value.substring(0, 10)}...`);
    } else {
        console.log(`❌ ${key}: Not set`);
    }
});

console.log('\n📊 Step 2: Server Configuration Status');
console.log('=====================================');

const configStatus = getConfigurationStatus();
console.log('OpenAI Configuration:', configStatus.openai);
console.log('Google Sheets Configuration:', configStatus.google);
console.log('HubSpot Configuration:', configStatus.hubspot);
console.log('Validation Results:', configStatus.validation);

console.log('\n🔧 Step 3: Validation Check');
console.log('===========================');

const validation = validateConfiguration();
if (validation.isValid) {
    console.log('✅ All configurations are valid and ready to use!');
} else {
    console.log('❌ Configuration issues found:');
    validation.errors.forEach(error => {
        console.log(`   - ${error}`);
    });
}

console.log('\n📝 Step 4: Configuration Summary');
console.log('================================');
console.log(`API Model: ${SERVER_AI_CONFIG.api.model}`);
console.log(`Temperature: ${SERVER_AI_CONFIG.api.temperature}`);
console.log(`Max Tokens: ${SERVER_AI_CONFIG.api.max_tokens}`);
console.log(`OpenAI Key Present: ${!!SERVER_AI_CONFIG.api.apiKey}`);
console.log(`Google API Key Present: ${!!SERVER_AI_CONFIG.google.apiKey}`);
console.log(`Google Spreadsheet ID: ${SERVER_AI_CONFIG.google.spreadsheetId || 'Not configured'}`);
console.log(`HubSpot Access Token Present: ${!!SERVER_AI_CONFIG.hubspot.accessToken}`);
console.log(`HubSpot Portal ID: ${SERVER_AI_CONFIG.hubspot.portalId || 'Not configured'}`);

console.log('\n🎯 Test Complete!');
console.log('================');

if (validation.isValid) {
    console.log('🎉 Your configuration is ready! You can now:');
    console.log('   - Start the server with: node server.js');
    console.log('   - Test the API endpoints');
    console.log('   - Use the chatbot interface');
} else {
    console.log('⚠️  Please fix the configuration issues above before proceeding.');
    console.log('   Check your .env.local file and ensure all required values are set.');
}

async function testAPI() {
    const baseUrl = 'http://localhost:3000';
    
    console.log('🧪 Testing Data Integration API Endpoints...\n');
    
    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch(`${baseUrl}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);
        
        // Test articles endpoint
        console.log('\n2. Testing articles endpoint...');
        const articlesResponse = await fetch(`${baseUrl}/api/articles`);
        const articlesData = await articlesResponse.json();
        console.log(`✅ Articles endpoint: ${articlesData.length} articles found`);
        
        if (articlesData.length > 0) {
            console.log('   Sample article:', articlesData[0].title);
        }
        
        // Test law firms endpoint
        console.log('\n3. Testing law firms endpoint...');
        const lawFirmsResponse = await fetch(`${baseUrl}/api/law-firms?specialty=mesothelioma`);
        const lawFirmsData = await lawFirmsResponse.json();
        console.log(`✅ Law firms endpoint: ${lawFirmsData.length} firms found`);
        
        // Test settlements endpoint
        console.log('\n4. Testing settlements endpoint...');
        const settlementsResponse = await fetch(`${baseUrl}/api/settlements?condition=mesothelioma`);
        const settlementsData = await settlementsResponse.json();
        console.log(`✅ Settlements endpoint: ${settlementsData.length} settlement records found`);
        
        // Test search endpoint
        console.log('\n5. Testing search endpoint...');
        const searchResponse = await fetch(`${baseUrl}/api/search/mesothelioma`);
        const searchData = await searchResponse.json();
        console.log('✅ Search endpoint:', searchData.condition);
        console.log(`   Found ${searchData.articles.length} articles, ${searchData.lawFirms.length} law firms`);
        
        // Test cache clear endpoint
        console.log('\n6. Testing cache clear endpoint...');
        const cacheResponse = await fetch(`${baseUrl}/api/cache/clear`, { method: 'POST' });
        const cacheData = await cacheResponse.json();
        console.log('✅ Cache clear endpoint:', cacheData.message);
        
        console.log('\n🎉 All API endpoints are working correctly!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Make sure the server is running with: npm start');
        }
    }
}

// Run the test
testAPI(); 