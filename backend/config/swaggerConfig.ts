import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Configurações do Swagger
const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger e TypeScript',
    },
  },
  // Caminho para os arquivos onde estão documentados os endpoints
  apis: ['src/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: any): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
