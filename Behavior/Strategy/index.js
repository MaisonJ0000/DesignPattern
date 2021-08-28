import { Config } from './config';
import ini from 'ini';

const iniStratagy = {
  deserialize: data => ini.parse(data),
  serialize: data => ini.stringify(data),
}

const jsonStratagy = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data, null, ' '),
}


async function main() {
  const iniConfig = new Config(iniStratagy);
  await iniConfig.load('samples/conf.ini');
  iniConfig.set('book.nodejs', 'design patterns2');
  await iniConfig.save('samples/conf_mod.ini');

  const jsonConfig = new Config(jsonStratagy);
  await jsonConfig.load('samples/conf.json');
  jsonConfig.set('book.nodejs', 'design patterns2');
  await jsonConfig.save('samples/conf_mod.json');
}

main();
