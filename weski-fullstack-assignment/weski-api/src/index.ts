import express from 'express';
import { hotelsHandler } from './handlers/hotels-handler';

const app = express();
app.use(express.json());

app.post('/api/proxy-hotels', hotelsHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
