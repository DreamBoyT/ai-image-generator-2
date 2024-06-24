const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const endpoint = "https://chat-gpt-a1.openai.azure.com/";
const azureApiKey = "c09f91126e51468d88f57cb83a63ee36";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentName = "Dalle3";

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { prompt, size } = req.body;

    try {
       
        const results = await client.getImages(deploymentName, prompt, { n: 1, size });
        const imageUrls = results.data.map(image => image.url);

        context.res = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://witty-beach-08e74421e.5.azurestaticapps.net',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: { imageUrls }
        };
    } catch (err) {
        context.log("Error generating image:", err);
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://witty-beach-08e74421e.5.azurestaticapps.net',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: { error: "Failed to generate image" }
        };
    }
};
