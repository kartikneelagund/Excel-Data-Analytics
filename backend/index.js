require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./controllers/authController"); // MongoDB connection
const userRoutes = require("./routes/authRoutes");           // /api/users (for signup/login)
const authRoutes = require("./middleware/auth");             // auth middleware (if needed)
const userCrudRoutes = require("./routes/userCrudRoutes");   // /api/userscrud (CRUD ops)

const app = express();

// Connect to MongoDB
connection();

//  Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);        // e.g., POST /api/users/register
app.use("/api/auth", authRoutes);         // middleware if used
app.use("/api/userscrud", userCrudRoutes); // e.g., GET, PUT, DELETE user data

// Start Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const allowedOrigins = ["http://localhost:5173","https://excel-data-analytics-frontend.vercel.app/login"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));