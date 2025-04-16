const express = require('express');
const app = express();
const PORT = 3040;

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('🔥 /mock/test HIT');
  res.send('✅ WORKING STANDALONE MOCK ROUTE');
});

app.use('/mock', router);

app.get('/', (req, res) => {
  res.send('Root is working');
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
});