// import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import level from 'level';
import { createFSAdapter } from "./fsAdapter";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbPath = join(__dirname, 'db');
console.log('[JONGMAN_LOG] dbPath', dbPath, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
const db = level(dbPath, { valueEncoding: 'binary' });

const fs = createFSAdapter(db);

// file.txt에 파일을 안 쓰고도 db를 통해 값을 기록할 수 있다.
fs.writeFile('flie.txt', 'Hello!', () => {
  fs.readFile('flie.txt', {encoding: 'utf8'}, (err, res) => {
    if (err) return console.error(err);
    console.log(res);
  })
})
fs.readFile('missing.txt', { encoding: 'utf8'}, (err, res) => {
  console.error(err);
})
