import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar o arquivo YAML
const yamlPath = path.join(__dirname, '../../docs/openapi.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const specs = yaml.load(yamlContent);

export default specs;