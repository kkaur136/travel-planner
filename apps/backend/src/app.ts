import express from "express";
import destinationRoutes from "./routes/destinationRoutes";


const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Travel Planner Backend is running!");
});

app.use("/api/destinations", destinationRoutes);

export default app;
