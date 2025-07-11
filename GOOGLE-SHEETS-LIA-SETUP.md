# 📊 Google Sheets Setup for LIA Active Cases

## 🎯 Overview

Your LIA Active Cases system now dynamically reads from a Google Sheets tab called **"Legal Injury Advocates Active cases"**. This allows you to manage which cases trigger the "Start your claim" referral without any code changes.

## 📋 Setting Up the Google Sheets Tab

### Step 1: Create the Tab

1. Open your Google Sheets document (ID: `1Fkqs9n5k1WSu8S8fTQfCw4LKDO9aKegp0GyE5j4fM8E`)
2. **Add a new tab** and name it exactly: `Legal Injury Advocates Active cases`
3. ⚠️ **Important**: The tab name must match exactly (including spaces and capitalization)

### Step 2: Set Up the Columns

Create these columns in Row 1 (header row):

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| **Case Type** | **Active** | **Keywords** | **Description** | **Last Updated** |

### Step 3: Add Your Active Cases

Here's a sample setup based on common mass tort cases:

| Case Type | Active | Keywords | Description | Last Updated |
|-----------|--------|----------|-------------|--------------|
| Mesothelioma | TRUE | mesothelioma, asbestos, asbestos exposure, pleural mesothelioma | Mesothelioma and asbestos exposure cases | 2025-01-11 |
| Talcum Powder | TRUE | talcum powder, talc, baby powder, ovarian cancer, johnson johnson | Talcum powder ovarian cancer cases | 2025-01-11 |
| Roundup | TRUE | roundup, glyphosate, herbicide, lymphoma, monsanto, bayer | Roundup lymphoma cases | 2025-01-11 |
| Camp Lejeune | TRUE | camp lejeune, water contamination, military base, marine corps | Camp Lejeune water contamination cases | 2025-01-11 |
| AFFF Foam | TRUE | afff, firefighting foam, pfas, pfoa, firefighter | AFFF firefighting foam cases | 2025-01-11 |
| Paraquat | TRUE | paraquat, herbicide, parkinson, parkinsons disease | Paraquat Parkinson's disease cases | 2025-01-11 |
| Hair Relaxer | FALSE | hair relaxer, chemical relaxer, uterine cancer | Hair relaxer cancer cases | 2025-01-11 |
| Car Accidents | FALSE | car accident, auto accident, vehicle accident | Car accident cases (not active) | 2025-01-11 |

## 🔧 Column Details

### **Case Type** (Required)
- The name of the legal case type
- Used for identification and display
- Examples: "Mesothelioma", "Talcum Powder", "Roundup"

### **Active** (Required)
- Controls whether this case triggers the LIA referral
- Accepted values: `TRUE`, `FALSE`, `true`, `false`, `ACTIVE`, `active`, `YES`, `yes`, `1`, `0`
- **Only cases marked as active will show the referral**

### **Keywords** (Required)
- Comma-separated list of keywords that trigger this case
- When a user's question contains any of these keywords, it matches this case
- Examples: `mesothelioma, asbestos, asbestos exposure`

### **Description** (Required)
- Brief description of the case type
- Used in the referral message to users
- Example: "Mesothelioma and asbestos exposure cases"

### **Last Updated** (Optional)
- When the case was last updated
- For tracking purposes only
- Any date format works

## 🎮 How It Works

### ✅ **Active Case Example:**
```
User: "I have mesothelioma from asbestos exposure and need legal advice"
System: [Helpful response] + "Legal Injury Advocates is currently handling mesothelioma and asbestos exposure cases. You can start your claim at legalinjuryadvocates.com."
```

### ❌ **Inactive Case Example:**
```
User: "I was injured in a car accident and need legal advice"
System: [Helpful response with NO referral]
```

## 🔄 Managing Your Cases

### To Activate a Case:
1. Change the **Active** column to `TRUE`
2. The change takes effect within 5 minutes (cache refresh)
3. Or restart the server for immediate updates

### To Deactivate a Case:
1. Change the **Active** column to `FALSE`
2. Users will no longer see the LIA referral for this case type

### To Add a New Case:
1. Add a new row with all required columns filled
2. Set **Active** to `TRUE` if you want it to trigger referrals
3. Add relevant **Keywords** that users might mention

### To Modify Keywords:
1. Edit the **Keywords** column for any case
2. Use commas to separate multiple keywords
3. Include variations users might use (e.g., "parkinsons", "parkinson disease")

## 🛠️ System Management

Your system automatically monitors Google Sheets to:

- ✅ **Load active cases** from your Google Sheets tab
- ✅ **Update every 5 minutes** (or on server restart)
- ✅ **Use fallback data** if Google Sheets is unavailable
- ✅ **Process queries** against active cases automatically
- ✅ **Log activity** for monitoring via server logs

## 🔍 Testing Your Setup

### 1. **Test Active Cases:**
```
Query: "I have mesothelioma and need legal advice"
Expected: ✅ Shows LIA referral
```

### 2. **Test Inactive Cases:**
```
Query: "I was in a car accident and need legal help"
Expected: ❌ No LIA referral shown
```

### 3. **Test Keyword Matching:**
```
Query: "I used talcum powder and developed ovarian cancer"
Expected: ✅ Shows LIA referral if Talcum Powder is active
```

## 📊 Data Flow

```
User Query → Keyword Matching → Google Sheets Check → Conditional Referral

1. User asks a question
2. System checks if question contains keywords from active cases
3. If match found, adds customized LIA referral
4. If no match or case is inactive, no referral shown
```

## 🚨 Troubleshooting

### **"Using fallback data" message:**
- ✅ Check that the tab name is exactly: `Legal Injury Advocates Active cases`
- ✅ Verify Google Sheets API access is working
- ✅ Ensure the spreadsheet ID is correct in `.env.local`

### **No referrals showing:**
- ✅ Check that cases are marked as `TRUE` in the Active column
- ✅ Verify keywords match what users are typing
- ✅ Test queries by actually using the chat interface

### **Wrong referrals showing:**
- ✅ Check for typos in keywords
- ✅ Verify only intended cases are marked as active
- ✅ Test with specific queries in the chat interface

## 🎉 Benefits

- ✅ **No Code Changes**: Manage cases directly in Google Sheets
- ✅ **Real-Time Updates**: Changes reflect within 5 minutes
- ✅ **Business Friendly**: Non-technical users can manage cases
- ✅ **Compliance**: Only refer cases LIA actually handles
- ✅ **Transparency**: Clear visibility into active cases

## 📞 Next Steps

1. **Create the Google Sheets tab** with the columns above
2. **Add your active cases** based on what LIA currently handles
3. **Test the system** using the main chat interface
4. **Train your team** on how to activate/deactivate cases in Google Sheets
5. **Monitor and adjust** keywords based on user queries

Your LIA referral system is now fully dynamic and Google Sheets-powered! 🚀 