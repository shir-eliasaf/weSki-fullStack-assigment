import { Request, Response } from "express";

import { fetchHotels } from "../services/hotel-service";

export const hotelsHandler = async (req: Request, res: Response) => {
  try {
    const hotels = await fetchHotels(req.body.query);
    res.json({ hotels });
  } catch (error: any) {
    console.error("Error in handler:", error.message || error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};
