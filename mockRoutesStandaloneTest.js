// Run with: node mockRoutesStandaloneTest.js
const express = require('express');
const app = express();
const PORT = 3050;

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('🔥 test route hit');
  res.send('✅ MOCK STANDALONE ROUTE WORKS');
});

app.use('/mock', router);

app.listen(PORT, () => {
  console.log(`🧪 Standalone test running on http://localhost:${PORT}`);
});