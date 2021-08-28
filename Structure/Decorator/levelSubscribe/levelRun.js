import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import level from 'level';
import levelSubscribe from "./levelSubscribe";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbPath = join(__dirname, 'db');
const db = level(dbPath, { valueEncoding: 'json' });
levelSubscribe(db);

db.subscribe({ doctype: 'tweet', language: 'en' }, (k,val) => {
  console.info('Subscribe!');
  console.info(val);
});

const run = () => {
  db.put('1', {
    doctype: 'tweet',
    text: 'Hi',
    language: 'en'
  });
  db.put('2', {
    doctype: 'company',
    name: 'ACME Co.'
  });

  db.get('2', function (err, value) {
    if (err) return console.log('Ooops!', err);
    console.log(`name=${JSON.stringify(value)}`);
  });
}

run();

