import express from "express";
import { ask } from "./ai.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ['https://www.bizzowl.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
  credentials: true,
  maxAge: 3600,
};


// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options('*', cors());

// Endpoint to handle requests for marketing strategies
app.post("/api/generate-strategy", async (req, res) => {
  const { companyName, companyDesc, goals, targetAudience, channels } =
    req.body;

  console.log(req.body, "req.body response....");

  if (!companyName || !companyDesc) {
    return res.status(400).json({
      error: "Business name, description, and required details are required.",
    });
  }

  try {
    const response = await ask(
      companyName,
      companyDesc,
      goals,
      targetAudience,
      channels
    );
    return res.json({ response });
  } catch (error) {
    console.error("Error generating strategy:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while generating the strategy." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
