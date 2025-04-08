import express from 'express';

const app = express();
const port = 8080;

app.get('/api/', (req, res) => {
  res.send('TicNEToe Service Root Stub - Just checkin - Auto-File-Reload confirmed!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TicNEToe service listening on port ${port}`);
});
