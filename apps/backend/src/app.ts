
import express from "express";
import cors from "cors";
import destinationRoutes from "./routes/destinationRoutes";

const app = express();

// Enable CORS for the React front-end
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Test route
app.get("/", (_req, res) => {
  res.send("Travel Planner Backend is running!");
});

// Destination API routes
app.use("/api/destinations", destinationRoutes);

export default app;