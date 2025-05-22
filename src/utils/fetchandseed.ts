import fs from 'fs';
import path from 'path';
import axios from 'axios';

const DATA_PATH = path.join(__dirname, '../data/products.json');

export async function fetchAndSeed() {
  if (fs.existsSync(DATA_PATH)) {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    if (data && JSON.parse(data).length > 0) {
      console.log('✅ Products already seeded.');
      return;
    }
  }

  console.log('🌐 Fetching product data...');
  const res = await axios.get('https://dummyjson.com/products?limit=100');
  const products = res.data.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    brand: p.brand,
    category: p.category,
    price: p.price,
  }));

  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
  console.log('✅ Products seeded successfully.');
}
