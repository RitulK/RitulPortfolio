# Environment Variables for Render Deployment

## Copy these values to your Render environment variables:

**MONGODB_URI:**
```
mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form
```

**PORT:** (Usually auto-set by Render, but you can specify if needed)
```
3000
```

## Quick Setup Steps for Render:

1. **Go to your Render service dashboard**
2. **Click on "Environment" tab**
3. **Add new environment variable:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form`
4. **Click "Save Changes"**
5. **Render will automatically redeploy**

## Verification:
After deployment, check the logs. You should see:
```
Server is running on port XXXX
MongoDB is connected
```

Your deployment will now work correctly! 🚀