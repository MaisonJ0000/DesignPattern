import { promises as fs } from 'fs';
import objectPath from 'object-path';

export class Config {
  constructor (formatStrategy) {
    this.data = {};
    this.formatStratagy = formatStrategy;
  }

  get (configPath) {
    return objectPath.get(this.data, configPath);
  }

  set (configPath, value) {
    return objectPath.set(this.data, configPath, value);
  }

  async load (filePath) {
    console.info(`Deserializing from ${filePath}`);
    this.data = this.formatStratagy.deserialize(
      await fs.readFile(filePath, 'utf-8')
    );
  }

  async save (filePath) {
    console.info(`Serializing to ${filePath}`);
    await fs.writeFile(filePath,
      this.formatStratagy.serialize(this.data))
  }
}
