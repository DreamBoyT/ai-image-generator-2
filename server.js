const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post("/generate", async (req, res) => {
    const { prompt, size, style, quality } = req.body;

    // Construct the prompt with style and quality
    const modifiedPrompt = `${prompt}, style: ${style}, quality: ${quality}`;

    try {
        // Call the Azure Function
        const response = await axios.post('https://tamil-fun-app-3.azurewebsites.net/api/HttpTrigger10', {
            prompt: modifiedPrompt,
            size: size
        });

        const imageUrls = response.data.imageUrls;
        res.json({ imageUrls });
    } catch (err) {
        console.error("Error generating image:", err);
        res.status(500).json({ error: "Failed to generate image" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
