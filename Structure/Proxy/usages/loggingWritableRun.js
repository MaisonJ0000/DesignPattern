import { createLoggingWritable } from "./loggingWritable";
import {createWriteStream}  from 'fs';

const writable = createWriteStream('./test.txt');
const writableProxy = createLoggingWritable(writable);

writable.write('First chunk');
writable.write('Second chunk');

writableProxy.write('Third chunk');
writableProxy.write('Forth chunk');
writableProxy.end();
