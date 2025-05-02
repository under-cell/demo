require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// --- Middleware ---
// Enable CORS for requests from your Vue frontend (adjust origin in production)
app.use(cors({ origin: '*' })); // Be more specific in production, e.g., 'http://localhost:5173'
app.use(express.json()); // Parse JSON request bodies

// --- OpenAI Client Initialization ---
let openai;
try {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
    console.warn("⚠️ OPENAI_API_KEY is not set or is the default placeholder. API calls will fail.");
    // You might want to throw an error here or handle it differently
    // depending on whether the API key is absolutely required at startup.
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.gptsapi.net/v1", // Set the custom base URL
    });
  }
} catch (error) {
  console.error("❌ Error initializing OpenAI client:", error.message);
  // Handle the error appropriately, maybe exit the process
  // process.exit(1);
}


// --- API Routes ---
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!openai) {
    return res.status(500).json({ error: 'OpenAI client not initialized. Check API key.' });
  }

  try {
    console.log(`✉️ Received prompt: ${prompt}`);

    // --- Call OpenAI GPT-4o --- 
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use the GPT-4o model
      messages: [
        // You can add more sophisticated system messages or few-shot examples here
        { role: "system", content: "You are a helpful assistant that generates creative copy." },
        { role: "user", content: prompt }
      ],
      // Add other parameters as needed (e.g., max_tokens, temperature)
      // max_tokens: 150,
      // temperature: 0.7,
    });

    console.log("✅ OpenAI response received.");

    // --- Extract and Send Response --- 
    // Ensure the response structure is as expected before accessing content
    const generatedText = completion.choices[0]?.message?.content?.trim();

    if (generatedText) {
      res.json({ generatedText });
    } else {
      console.error("❌ Unexpected OpenAI response structure:", completion);
      res.status(500).json({ error: 'Failed to generate text from OpenAI response' });
    }

  } catch (error) {
    console.error('❌ Error calling OpenAI API:', error.response ? error.response.data : error.message);
    // Provide more specific error messages based on OpenAI error types if needed
    if (error.response && error.response.status === 401) {
        res.status(401).json({ error: 'OpenAI authentication error. Check your API key.' });
    } else if (error.response && error.response.status === 429) {
        res.status(429).json({ error: 'OpenAI rate limit exceeded. Please try again later.' });
    } else {
        res.status(500).json({ error: 'Failed to generate text' });
    }
  }
});

// --- Basic Root Route (Optional) ---
app.get('/', (req, res) => {
  res.send('Smart Copywriter Backend is running!');
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Backend server listening at http://localhost:${port}`);
}); 