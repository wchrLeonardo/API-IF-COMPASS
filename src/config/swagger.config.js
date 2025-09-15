import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API IF COMPASS',
            version: '1.0.0'
        },
    },
    apis: [
        path.join(__dirname, '../../docs/openapi.yaml'),
        path.join(__dirname, '../../docs/paths/*.yaml'),
        path.join(__dirname, '../../docs/schemas/*.yaml')
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;