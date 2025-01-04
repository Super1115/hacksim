import axios from 'axios';

/**
 * Authenticates a user with GitHub and retrieves their user data.
 * @param {string} clientId - Your GitHub OAuth app's client ID.
 * @param {string} clientSecret - Your GitHub OAuth app's client secret.
 * @returns {Promise<object>} - The authenticated user's data.
 */
async function githubAuth(clientId, clientSecret) {
  const apiBase = 'https://github.com';
  const apiUrl = 'https://api.github.com';

  try {

    const deviceCodeResponse = await axios.post(`${apiBase}/login/device/code`, null, {
      params: { client_id: clientId, scope: 'read:user user:email' },
      headers: { 'Accept': 'application/json' },
    });

    const { device_code, user_code, verification_uri } = deviceCodeResponse.data;

    console.log(`To authenticate, go to ${verification_uri} and enter the code: ${user_code}`);


    let accessToken;
    const pollInterval = 5000; 
    const startTime = Date.now();
    const timeout = deviceCodeResponse.data.expires_in * 1000; 

    while (true) {
      if (Date.now() - startTime > timeout) {
        throw new Error('Authentication timed out. Please try again.');
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));

      const tokenResponse = await axios.post(`${apiBase}/login/oauth/access_token`, null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          device_code,
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        },
        headers: { 'Accept': 'application/json' },
      });

      if (tokenResponse.data.access_token) {
        accessToken = tokenResponse.data.access_token;
        break;
      }

      if (tokenResponse.data.error === 'authorization_pending') {
        continue; 
      }

      throw new Error(`Authentication failed: ${tokenResponse.data.error_description}`);
    }

    const userResponse = await axios.get(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return userResponse.data;
  } catch (error) {
    console.error('Error during GitHub authentication:', error.message);
    throw error;
  }
}


export default githubAuth;