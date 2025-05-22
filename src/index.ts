import express from 'express';
import productRoutes from './routes/productRoutes';
import { fetchAndSeed } from './utils/fetchandseed';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', productRoutes);

fetchAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
