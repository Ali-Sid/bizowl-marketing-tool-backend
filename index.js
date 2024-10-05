import express from "express";
import { ask } from "./ai.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// app.use(cors());

app.use(
  cors({
    origin: "https://www.bizzowl.com", // Adjust this to your needs, '*' allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify the methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the headers you want to allow
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);


// Custom CORS middleware
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://www.bizzowl.com");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === 'OPTIONS') {
     // Preflight request. Reply successfully:
     return res.status(200).end();
  }
  next();
 };
 
 // Use the custom CORS middleware
 app.use(allowCrossDomain);

// app.use(cors(corsOptions));

// Handle OPTIONS requests for CORS
app.options('*', cors(corsOptions));


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
