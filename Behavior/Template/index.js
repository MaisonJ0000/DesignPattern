import ini from 'ini';
import {ConfigTemplate} from "./configTemplate";

class IniConfig extends ConfigTemplate {
  _deserialize(data) { return ini.parse(data); };
  _serialize(data) { return ini.stringify(data); };
}

class JsonConfig extends ConfigTemplate {
  _deserialize(data) { return JSON.parse(data) };
  _serialize(data) { return JSON.stringify(data, null, ' '); };
}


async function main() {
  const iniConfig = new IniConfig();
  await iniConfig.load('samples/conf.ini');
  iniConfig.set('book.nodejs', 'design patterns2');
  await iniConfig.save('samples/conf_mod.ini');

  const jsonConfig = new JsonConfig();
  await jsonConfig.load('samples/conf.json');
  jsonConfig.set('book.nodejs', 'design patterns2');
  await jsonConfig.save('samples/conf_mod.json');
}

main();
