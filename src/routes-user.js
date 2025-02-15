const http = require('http')
const express = require('express')
const router = express.Router()


// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
});
  
// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
  
    try {
      // Exchange authorization code for access token
      const { data } = await axios.post('<https://oauth2.googleapis.com/token>', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      });
  
      const { access_token, id_token } = data;
  
      // Use access_token or id_token to fetch user profile
      const { data: profile } = await axios.get('<https://www.googleapis.com/oauth2/v1/userinfo>', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      // Code to handle user authentication and retrieval using the profile data
  
      res.redirect('/');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      res.redirect('/login');
    }
});
  
// Logout route
router.get('/logout', (req, res) => {
    // Code to handle user logout
    res.redirect('/login');
});
  
module.exports = router;