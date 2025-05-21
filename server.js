import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/scan', async (req, res) => {
  const { start, end, modelTarget, backdropTarget } = req.body;

  const results: any[] = [];

  for (let id = start; id <= end; id++) {
    const dbIndex = Math.floor((id - 1) / 10000) + 1;
    const dbPath = path.join(__dirname, 'nft', 'LightSword', `LightSwordData-${dbIndex}.db`);

    if (!fs.existsSync(dbPath)) continue;

    const db = new sqlite3.Database(dbPath);

    const match = await new Promise((resolve) => {
      db.get('SELECT * FROM nft WHERE id = ?', [id], (err, row) => {
        db.close();

        if (err || !row) return resolve(null);
        if (row.model === modelTarget && row.backdrop === backdropTarget) {
          resolve({
            id: row.id,
            model: row.model,
            backdrop: row.backdrop,
            url: `https://t.me/nft/LightSword-${row.id}`
          });
        } else {
          resolve(null);
        }
      });
    });

    if (match) results.push(match);
  }

  res.json({ results });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
