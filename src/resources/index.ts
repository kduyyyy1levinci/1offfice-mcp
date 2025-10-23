import fs from 'fs';
import path from 'path';

const resourceFiles = fs.readdirSync(__dirname).filter(f => f !== 'index.ts');
for (const file of resourceFiles) {
  import(path.join(__dirname, file));
}
