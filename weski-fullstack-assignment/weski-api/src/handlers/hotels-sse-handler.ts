import { Request, Response } from "express";
import { streamHotels } from "../services/hotel-service";
import { setupSSEHeaders, sendSSE } from "../utils/sse-utils";

export const hotelsSSEHandler = async (req: Request, res: Response) => {
  const { ski_site, from_date, to_date, group_size } = req.query;

  if (!ski_site || !from_date || !to_date || !group_size) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const parsedQuery = {
    ski_site: String(ski_site),
    from_date: String(from_date),
    to_date: String(to_date),
    group_size: Number(group_size),
  };

  try {
    for await (const hotel of streamHotels(parsedQuery)) {
      res.write(`data: ${JSON.stringify(hotel)}\n\n`);
    }

    res.write(`event: done\ndata: {}\n\n`);
    res.end();
  } catch (err: any) {
    console.error("SSE Error:", err.message || err);
    res.write(
      `event: error\ndata: ${JSON.stringify({ error: "Streaming failed" })}\n\n`
    );
    res.end();
  }

  req.on("close", () => {
    console.log("SSE connection closed");
  });
};

// utils: setHeaders function (lines 12-14) , sse functions: write, done, error
