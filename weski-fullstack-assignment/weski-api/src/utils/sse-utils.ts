import { Response } from "express";

export const setupSSEHeaders = (res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
};

export const sendSSE = (res: Response, data: any) => {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

//not using it but should
