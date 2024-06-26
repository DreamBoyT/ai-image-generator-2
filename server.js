const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://witty-beach-08e74421e.5.azurestaticapps.net");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Endpoint for generating images
app.post("/generate", async (req, res) => {
    const { prompt, size, style, quality } = req.body;

    // Construct the prompt with style and quality
    const modifiedPrompt = `${prompt}, style: ${style}, quality: ${quality}`;

    try {
        // Make a POST request to Azure Function
        const response = await axios.post('https://tamil-fun-app-3.azurewebsites.net/api/HttpTrigger10', {
            prompt: modifiedPrompt,
            size: size
        });

        const imageUrls = response.data.imageUrls;
        res.json({ imageUrls });
    } catch (error) {
        console.error('Error generating images:', error);
        res.status(500).json({ error: 'Failed to generate images' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
