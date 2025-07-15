# Deployment Checklist: MCP Server → HubSpot Integration

## Phase 1: Prepare GitHub Repository

- [ ] **Initialize Git Repository**
  ```bash
  git init
  git add .
  git commit -m "Initial commit: MCP server with HubSpot integration"
  ```

- [ ] **Create GitHub Repository**
  - Go to GitHub.com
  - Create new repository: `injury-info-mcp-server`
  - Make it public or private (your choice)

- [ ] **Push Code to GitHub**
  ```bash
  git remote add origin https://github.com/yourusername/injury-info-mcp-server.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Verify Repository Structure**
  - ✅ `server.js` (main Express server)
  - ✅ `package.json` (dependencies)
  - ✅ `vercel.json` (Vercel config)
  - ✅ `railway.json` (Railway config)
  - ✅ `.env.local` (local environment variables)
  - ✅ All connector files and scripts

## Phase 2: Deploy to Vercel (Recommended)

- [ ] **Sign up for Vercel**
  - Go to [vercel.com](https://vercel.com)
  - Sign up with GitHub account

- [ ] **Import GitHub Repository**
  - Click "New Project"
  - Import your `injury-info-mcp-server` repository
  - Vercel will auto-detect Node.js configuration

- [ ] **Configure Environment Variables**
  In Vercel dashboard → Settings → Environment Variables:
  ```
  HUBSPOT_ACCESS_TOKEN=pat-na1-23a64900-ff0b-4630-8067-8612b83efc66
  HUBSPOT_PORTAL_ID=45899920
  GOOGLE_API_KEY=your-google-api-key-here
  GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
  OPENAI_API_KEY=your-openai-api-key-here
  NODE_ENV=production
  ```

- [ ] **Deploy**
  - Click "Deploy"
  - Wait for build to complete
  - Note your deployment URL: `https://your-app.vercel.app`

- [ ] **Test Deployment**
  ```bash
  curl https://your-app.vercel.app/api/test
  ```
  Should return: `{"success":true,"message":"OpenAI API connection successful"}`

## Phase 3: Set Up HubSpot Website

- [ ] **HubSpot CMS Hub Setup**
  - Sign up for HubSpot CMS Hub
  - Choose plan (Professional recommended)
  - Set up your domain (optional)

- [ ] **Create Website Structure**
  - Home page
  - Injury information pages
  - Blog section
  - Contact page
  - Legal resources page

- [ ] **Design Templates**
  - Create responsive templates
  - Ensure mobile-friendly design
  - Match your brand colors and fonts

## Phase 4: API Integration

- [ ] **Test API Connectivity**
  ```javascript
  // Test in browser console
  fetch('https://your-app.vercel.app/api/test')
    .then(response => response.json())
    .then(data => console.log(data));
  ```

- [ ] **Create HubSpot Custom Module**
  - Go to HubSpot → Design Tools → File Manager
  - Create new module: "Injury Info Search"
  - Add the JavaScript code from `hubspot-integration-guide.md`

- [ ] **Add Search Functionality**
  - Implement condition search
  - Add law firm finder
  - Create settlement data display

## Phase 5: Chatbot Integration

- [ ] **Create Custom Chat Widget**
  - Design chat widget UI
  - Implement chat functionality
  - Connect to `/api/chat` endpoint

- [ ] **Test Chatbot**
  - Test basic conversations
  - Verify injury-related responses
  - Check error handling

- [ ] **Style Chat Widget**
  - Match website design
  - Ensure mobile responsiveness
  - Add loading states

## Phase 6: Data Integration

- [ ] **Verify HubSpot Connector**
  - Test HubSpot API connectivity
  - Verify custom properties exist
  - Check data synchronization

- [ ] **Test Google Sheets Integration**
  - Verify spreadsheet access
  - Test data retrieval
  - Check fallback mechanisms

- [ ] **Set Up Data Flow**
  - User searches → MCP server → HubSpot CRM
  - Chat interactions → Contact creation
  - Lead scoring automation

## Phase 7: Testing & Quality Assurance

- [ ] **Functional Testing**
  - Test all API endpoints
  - Verify search functionality
  - Test chatbot responses
  - Check form submissions

- [ ] **Performance Testing**
  - Test page load speeds
  - Verify API response times
  - Check mobile performance

- [ ] **Security Testing**
  - Verify HTTPS connections
  - Check API key security
  - Test input validation

- [ ] **Cross-Browser Testing**
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers
  - Different screen sizes

## Phase 8: Launch Preparation

- [ ] **Content Review**
  - Review all injury information
  - Verify legal disclaimers
  - Check medical accuracy
  - Update contact information

- [ ] **SEO Optimization**
  - Meta tags and descriptions
  - Page titles
  - Alt text for images
  - Sitemap generation

- [ ] **Analytics Setup**
  - Google Analytics
  - HubSpot analytics
  - Custom event tracking
  - Conversion tracking

- [ ] **Backup Strategy**
  - Database backups
  - Code repository backups
  - Environment variable backups

## Phase 9: Go Live

- [ ] **Final Testing**
  - End-to-end user journey
  - Payment processing (if applicable)
  - Email notifications
  - Error handling

- [ ] **Launch Website**
  - Point domain to HubSpot
  - Enable SSL certificate
  - Set up redirects
  - Monitor for issues

- [ ] **Post-Launch Monitoring**
  - Monitor server logs
  - Check error rates
  - Track user engagement
  - Monitor API usage

## Phase 10: Maintenance & Updates

- [ ] **Regular Updates**
  - Update dependencies
  - Security patches
  - Content updates
  - Feature enhancements

- [ ] **Performance Monitoring**
  - Server response times
  - Database performance
  - CDN optimization
  - Cache management

- [ ] **User Feedback**
  - Collect user feedback
  - Monitor support tickets
  - Track conversion rates
  - A/B test improvements

## Troubleshooting Common Issues

### Deployment Issues
- **Build Failures**: Check Node.js version compatibility
- **Environment Variables**: Verify all variables are set correctly
- **API Errors**: Check API key validity and quotas

### HubSpot Integration Issues
- **Custom Modules**: Verify HubL syntax
- **API Calls**: Check CORS settings
- **Styling**: Ensure CSS is properly loaded

### Performance Issues
- **Slow Loading**: Optimize images and code
- **API Timeouts**: Implement caching
- **Database Queries**: Optimize queries and indexes

## Success Metrics

Track these metrics to measure success:

- **Website Performance**: Page load times < 3 seconds
- **API Response**: < 500ms for search queries
- **User Engagement**: > 60% chat completion rate
- **Lead Generation**: Track form submissions and conversions
- **SEO Performance**: Organic traffic growth
- **User Satisfaction**: Positive feedback and low bounce rate

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **HubSpot Developer Hub**: [developers.hubspot.com](https://developers.hubspot.com)
- **MCP Server Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **GitHub Issues**: Use your repository for bug tracking 