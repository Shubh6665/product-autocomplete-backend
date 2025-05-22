import { Request, Response } from 'express';
import { searchProducts } from '../services/productServices';

export function searchHandler(req: Request, res: Response): void {
  const q = req.query.q as string;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = parseInt(req.query.skip as string) || 0;

  if (!q || q.length < 2) {
    res.status(400).json({ error: 'Query must be at least 2 characters long.' });
    return;
  }

  const results = searchProducts(q, limit, skip);
  res.json({ count: results.length, results });
}
