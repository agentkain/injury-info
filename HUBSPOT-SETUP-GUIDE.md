# HubSpot Setup Guide - Legal Injury Information Platform

## 🎯 Overview

This guide will walk you through setting up HubSpot integration for the Legal Injury Information Platform. This integration allows you to:
- Store and manage law firm data in HubSpot CRM
- Create content pages for legal conditions
- Track user interactions and leads
- Automate lead processing workflows

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] HubSpot account with CRM access
- [ ] Admin permissions in HubSpot
- [ ] API access enabled
- [ ] The platform server deployed and running

## 🔧 Phase 1: HubSpot Account Setup

### Step 1: Create HubSpot Account
1. **Sign up for HubSpot**: Go to [HubSpot.com](https://www.hubspot.com) and create an account
2. **Choose Plan**: 
   - Free tier: Basic CRM functionality
   - Paid tier: Advanced features, API access, custom properties
3. **Complete Setup**: Follow HubSpot's onboarding process

### Step 2: Enable API Access
1. **Navigate to Settings**: Click the gear icon in the top right
2. **Go to Integrations**: Settings → Integrations → Private Apps
3. **Create Private App**:
   - Name: "Legal Injury Platform"
   - Description: "Integration for legal injury information platform"
4. **Configure Scopes**: Enable these scopes:
   - `crm.objects.companies.read`
   - `crm.objects.companies.write`
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.custom.read`
   - `crm.objects.custom.write`
   - `content.read`
   - `content.write`
5. **Generate Token**: Save the access token securely

### Step 3: Get Your Portal ID
1. **Navigate to Settings**: Click the gear icon
2. **Go to Account & Billing**: Settings → Account & Billing → Account Information
3. **Copy Portal ID**: Note down your HubSpot Portal ID

## 🏗️ Phase 2: Custom Properties Setup

### Step 4: Create Company Properties (for Law Firms)
1. **Navigate to Properties**: Settings → Properties → Company Properties
2. **Create these custom properties**:

#### Law Firm Specialties
- **Property Name**: `law_firm_specialties`
- **Label**: "Law Firm Specialties"
- **Type**: Multiple checkboxes
- **Options**:
  - Mesothelioma
  - Asbestos
  - Personal Injury
  - Product Liability
  - Medical Malpractice
  - Workers' Compensation
  - Mass Tort
  - Class Action

#### Years of Experience
- **Property Name**: `years_of_experience`
- **Label**: "Years of Experience"
- **Type**: Number
- **Description**: "Number of years practicing law"

#### Success Rate
- **Property Name**: `success_rate`
- **Label**: "Success Rate"
- **Type**: Number
- **Description**: "Percentage of successful cases"

#### Notable Settlements
- **Property Name**: `notable_settlements`
- **Label**: "Notable Settlements"
- **Type**: Multi-line text
- **Description**: "List of significant settlements (separate with semicolons)"

### Step 5: Create Contact Properties (for Leads)
1. **Navigate to Properties**: Settings → Properties → Contact Properties
2. **Create these custom properties**:

#### Injury Type
- **Property Name**: `injury_type`
- **Label**: "Injury Type"
- **Type**: Dropdown
- **Options**:
  - Mesothelioma
  - Asbestos Exposure
  - Personal Injury
  - Product Liability
  - Medical Malpractice
  - Other

#### Exposure Details
- **Property Name**: `exposure_details`
- **Label**: "Exposure Details"
- **Type**: Multi-line text
- **Description**: "Details about injury or exposure"

#### Legal Interest Level
- **Property Name**: `legal_interest_level`
- **Label**: "Legal Interest Level"
- **Type**: Dropdown
- **Options**:
  - High - Ready to pursue legal action
  - Medium - Considering legal options
  - Low - Information gathering only

## 🏢 Phase 3: Custom Objects Setup

### Step 6: Create Manufacturer Cases Object
1. **Navigate to Objects**: Settings → Objects → Create custom object
2. **Object Details**:
   - **Object Name**: "Manufacturer Cases"
   - **Object ID**: `manufacturer_cases`
   - **Primary Property**: "Case Name"

#### Add Properties:
- **Manufacturer Name** (`manufacturer_name`): Single-line text
- **Product Name** (`product_name`): Single-line text
- **Allegation** (`allegation`): Multi-line text
- **Case Status** (`case_status`): Dropdown (Active, Settled, Dismissed)
- **Total Settlements** (`total_settlements`): Number
- **Total Cases** (`total_cases`): Number
- **Settlement Range Min** (`settlement_range_min`): Number
- **Settlement Range Max** (`settlement_range_max`): Number

### Step 7: Create Medical Conditions Object
1. **Create Object**: "Medical Conditions"
2. **Object ID**: `medical_conditions`
3. **Properties**:
   - **Condition Name** (`condition_name`): Single-line text
   - **Medical Description** (`medical_description`): Multi-line text
   - **Common Symptoms** (`common_symptoms`): Multi-line text
   - **Risk Factors** (`risk_factors`): Multi-line text
   - **Treatment Options** (`treatment_options`): Multi-line text
   - **Legal Implications** (`legal_implications`): Multi-line text

## 📊 Phase 4: Data Import

### Step 8: Import Law Firm Data
1. **Navigate to Contacts**: Go to Contacts → Companies
2. **Click Import**: Choose "Import from file"
3. **Upload CSV**: Use the template below or prepare your own

#### Sample Law Firm CSV Template:
```csv
name,city,state,phone,website,industry,law_firm_specialties,years_of_experience,success_rate,notable_settlements
"Smith & Associates","New York","NY","555-0123","https://smithlaw.com","Legal Services","Mesothelioma;Asbestos","25","85","$2.5M settlement for mesothelioma case;$1.8M asbestos verdict"
"Johnson Legal Group","Los Angeles","CA","555-0456","https://johnsonlegal.com","Legal Services","Personal Injury;Product Liability","15","90","$3.2M personal injury settlement"
```

### Step 9: Import Medical Conditions Data
1. **Navigate to Custom Objects**: Go to Medical Conditions
2. **Import Data**: Use CSV format with your medical conditions data

## 🔗 Phase 5: Platform Integration

### Step 10: Configure Environment Variables
Add these to your `.env.local` file:
```env
# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=your_private_app_access_token_here
HUBSPOT_PORTAL_ID=your_portal_id_here
```

### Step 11: Test the Integration
1. **Start Your Server**: `npm start`
2. **Test API Endpoints**:
   ```bash
   # Test law firm search
   curl "http://localhost:3000/api/law-firms?specialty=Mesothelioma"
   
   # Test configuration
   curl "http://localhost:3000/api/config/status"
   ```

## 🚀 Phase 6: Advanced Features

### Step 12: Set Up Workflows
1. **Navigate to Workflows**: Marketing → Workflows
2. **Create New Workflow**: "Legal Lead Processing"
3. **Enrollment Trigger**: Contact property "Legal Interest Level" is "High"
4. **Actions**:
   - Send internal notification
   - Add to appropriate law firm list
   - Schedule follow-up task

### Step 13: Create Forms for Lead Capture
1. **Navigate to Forms**: Marketing → Forms
2. **Create Form**: "Legal Consultation Request"
3. **Add Fields**:
   - First Name
   - Last Name
   - Email
   - Phone
   - Injury Type (dropdown)
   - Exposure Details (text area)
   - Legal Interest Level (dropdown)

### Step 14: Set Up Lead Scoring
1. **Navigate to Lead Scoring**: Contacts → Lead Scoring
2. **Create Scoring Criteria**:
   - Legal Interest Level = High: +50 points
   - Legal Interest Level = Medium: +25 points
   - Form submission: +20 points
   - Injury Type = Mesothelioma: +30 points (higher urgency)

## 🔧 Phase 7: Testing & Validation

### Step 15: Test Data Flow
1. **Create Test Company**: Add a test law firm
2. **Create Test Contact**: Add a test lead
3. **Test API Calls**: Verify your platform can read the data
4. **Test Workflows**: Submit a test form and verify automation

### Step 16: Monitor Integration
1. **Check Logs**: Monitor server logs for HubSpot API calls
2. **API Usage**: Monitor your HubSpot API usage in settings
3. **Error Handling**: Test with invalid data to ensure graceful failures

## 📋 Phase 8: Go-Live Checklist

### Before Going Live:
- [ ] All custom properties created
- [ ] Sample data imported
- [ ] API integration tested
- [ ] Workflows configured
- [ ] Forms created and tested
- [ ] Lead scoring set up
- [ ] Error handling verified
- [ ] API rate limits understood

### Post Go-Live:
- [ ] Monitor API usage
- [ ] Track lead quality
- [ ] Analyze workflow performance
- [ ] Regular data backups
- [ ] Update documentation

## 🚨 Troubleshooting

### Common Issues:

#### "API key not valid" Error
- **Check**: Verify your access token is correct
- **Check**: Ensure scopes are properly configured
- **Check**: Confirm the private app is active

#### "Property not found" Error
- **Check**: Verify custom property names match exactly
- **Check**: Ensure properties are published
- **Check**: Confirm object permissions

#### No Data Returned
- **Check**: Verify data exists in HubSpot
- **Check**: Confirm filters in API calls
- **Check**: Test with HubSpot's API explorer

#### Rate Limiting
- **Check**: Monitor API usage in HubSpot settings
- **Solution**: Implement exponential backoff in code
- **Solution**: Cache data to reduce API calls

## 📞 Support Resources

### HubSpot Resources:
- [HubSpot Developer Documentation](https://developers.hubspot.com/)
- [HubSpot API Reference](https://developers.hubspot.com/docs/api/overview)
- [HubSpot Community](https://community.hubspot.com/)

### Platform-Specific:
- Review `hubspot-connector.js` for implementation details
- Check `data-integration-service.js` for data flow
- Monitor server logs for debugging

## 🎯 Next Steps

After completing this setup:
1. **Data Population**: Add real law firm and case data
2. **Content Creation**: Create legal condition pages
3. **SEO Optimization**: Optimize pages for search
4. **Analytics**: Set up tracking and reporting
5. **Automation**: Expand workflows and lead nurturing

---

**Your HubSpot integration is now ready to power your legal injury information platform!** 