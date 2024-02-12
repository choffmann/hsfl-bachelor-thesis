import { readFileSync } from 'fs';
import { parse } from 'acorn';

const filePath = process.argv[2];

const fileContent = readFileSync(filePath, 'utf-8');
const ast = parse(fileContent, { ecmaVersion: 'latest' });
console.log(JSON.stringify(ast));
