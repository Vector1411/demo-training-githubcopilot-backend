import { Response } from 'express';

export const ok = (res: Response, data: any, meta?: any) =>
  res.json({ data, ...(meta ? { meta } : {}) });

export const created = (res: Response, data: any) => res.status(201).json({ data });

export const fail = (res: Response, status: number, err: any) =>
  res.status(status).json({ error: err });

