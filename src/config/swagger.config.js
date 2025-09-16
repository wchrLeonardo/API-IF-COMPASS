import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yamlFile = fs.readFileSync(path.join(__dirname, '../../docs/openapi.yaml'), 'utf8');
const swaggerSpec = yaml.load(yamlFile);

export default swaggerSpec;