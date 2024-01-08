import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true,
  uiUrl: 'docs',
  specEnabled: true,
  specUrl: '/swagger.json',

  middleware: [],

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Farm Hub API ',
        version: '1.0.0',
        description: `Documentação dos endpoints da API para gerenciamento de cadastros de produtos e fazendas.
		 Através desse recurso também é possivel obter informações relevantes 
		 em relação a indicadores da base de dados 🚜🚜🚀`,
      },
    },

    apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],
    basePath: 'api/v1',
  },
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json',
} as SwaggerConfig
