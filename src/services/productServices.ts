import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(__dirname, '../data/products.json');

export function searchProducts(query: string, limit: number, skip: number) {
  const products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  
  const q = (typeof query === 'string' ? query : '').toLowerCase();
  
  if (q.length < 2) {
    return [];
  }
    
  const scored = products
    .map((product: any) => {
      const title = (typeof product.title === 'string' ? product.title : '').toLowerCase();
      const brand = (typeof product.brand === 'string' ? product.brand : '').toLowerCase();
      let score = 0;

      if (title.startsWith(q)) score = 3;
      else if (title.includes(q)) score = 2;
      else if (brand.includes(q)) score = 1;

      return score > 0 ? { ...product, score } : null;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.score - a.score);

  return scored.slice(skip, skip + limit);
}