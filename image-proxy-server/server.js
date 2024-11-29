const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint for fetching images
app.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send("Error: URL is required.");
  }

  try {
    // Fetch the image from the URL
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer', // Fetch image as raw binary data
    });

    // Set headers to match the image type
    const contentType = response.headers['content-type'];
    res.set('Content-Type', contentType);

    // Send the image back to the client
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching the image:", error.message);
    res.status(500).send("Error: Unable to fetch image.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
