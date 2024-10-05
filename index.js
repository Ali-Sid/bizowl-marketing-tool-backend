import express from "express";
import { ask } from "./ai.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// app.use(cors());

const corsOptions = {
  origin: 'https://www.bizzowl.com', // Allow only bizzowl.com
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: '*',
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handle OPTIONS requests for CORS
app.options('/api/generate-strategy', cors(corsOptions));


// const corsOptions = {
//   origin: '*', // Replace with your frontend URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   allowedHeaders: '*',
// };
// app.use(cors(corsOptions));

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
