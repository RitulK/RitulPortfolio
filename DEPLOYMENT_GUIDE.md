# 🚀 Deployment Configuration Guide

## Environment Variables for Production

Your server now supports both local config files and environment variables for production deployment.

### Required Environment Variables for Render/Production:

1. **MONGODB_URI**
   - Value: `mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form`

2. **PORT** (Optional)
   - Value: Usually auto-set by hosting platform
   - Default: 3000

## 🔧 Render.com Setup Instructions

### Step 1: Go to Render Dashboard
1. Log into your Render account
2. Select your deployed service
3. Go to "Environment" tab

### Step 2: Add Environment Variables
```
Key: MONGODB_URI
Value: mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form
```

### Step 3: Deploy
1. Click "Save Changes"
2. Render will automatically redeploy with the new environment variables

## 💻 Local Development

### Option 1: Use config.json (Recommended)
```json
{
  "mongodb": {
    "uri": "mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form"
  },
  "server": {
    "port": 3000
  }
}
```

### Option 2: Use Environment Variables
```bash
# Windows PowerShell
$env:MONGODB_URI="mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form"
node server2.js

# Linux/Mac
export MONGODB_URI="mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form"
node server2.js
```

## 🔄 Configuration Priority

The server checks for configuration in this order:
1. **Environment Variables** (Production)
2. **config.json file** (Local Development)
3. **Error if neither found**

## ✅ Deployment Checklist

- [ ] Add MONGODB_URI to Render environment variables
- [ ] Ensure PORT is set (usually automatic)
- [ ] Commit and push changes to trigger deployment
- [ ] Check deployment logs for successful connection

## 🛠️ Troubleshooting

### "MONGODB_URI not found" Error
- **Cause**: Environment variable not set on hosting platform
- **Solution**: Add MONGODB_URI to your hosting platform's environment variables

### Local Development Issues
- **Cause**: No config.json file in local development
- **Solution**: Copy config.template.json to config.json and add your MongoDB URI

### Production Deployment Issues
- **Cause**: Environment variables not properly set
- **Solution**: Check hosting platform environment variable settings

Your deployment should now work correctly with environment variables! 🎉