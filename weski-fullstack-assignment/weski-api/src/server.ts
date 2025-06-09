import express from "express";
import { hotelsHandler } from "./handlers/hotels-handler";
import { hotelsSSEHandler } from "./handlers/hotels-sse-handler";

const app = express();
app.use(express.json());

app.post("/api/proxy-hotels", hotelsHandler);

app.get("/api/sse-hotels", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  hotelsSSEHandler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//same, use the utils function
