//NOTA H.1: Configuración de Express App 
//Archivo principal de configuración y despliegue de la aplicación RESTful

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config.js';
import { mongoose } from './config/database.config.js';
import routeAPI from "./api/v1/routes/index.js";

//CGAC: Crear aplicación Express
const app = express();

//JAPV: Establecer puerto desde config
app.set('port', config.PORT);
app.set('env', config.NODE_ENV);

//MASU: MongoDB ya está conectado en database.config.js
//Esta conexión se importa y ejecuta al iniciarse la app
mongoose.connection.on('error', (error) => {
    console.error('MongoDB Connection Error:', error.message);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected Successfully');
    console.log(`   Database: ${mongoose.connection.name}`);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB Disconnected');
});

//BAFS: CORS - Permitir solicitudes cross-origin
app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true
}));

//AGU: Morgan - Logger HTTP
app.use(morgan(config.LOG_LEVEL));

//CDCH: Parsers - Parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//JAPV: Ruta raíz de la API
const api = config.API_URL;
app.get(`${api}`, (req, res) => {
    res.status(200).json({
        message: 'RESTful API - Gestión de Institutos Educativos',
        version: config.APP_VERSION,
        name: config.APP_NAME,
        documentation: `${api}/api-docs`,
        endpoints: {
            institutos: {
                listar: `GET ${api}/institutos`,
                obtener: `GET ${api}/institutos/:id`,
                crear: `POST ${api}/institutos`,
                actualizar: `PUT ${api}/institutos/:id`,
                eliminar: `DELETE ${api}/institutos/:id`
            }
        }
    });
});

//CDCH: Ruta alternativa para compatibilidad
app.get('/DrFIC', (req, res) => {
    res.status(200).json({
        message: 'DrFIC API Server',
        description: 'Sistema de Gestión de Inversiones en Recursos Educativos',
        documentation: `${api}/api-docs`
    });
});

//MASU: Incluir todas las rutas del módulo
routeAPI(app);

//AGU: Manejador centralizado de errores - Debe ser último
app.use((err, req, res, next) => {
  console.error('Error Capturado:', {
    message: err.message,
    status: err.status || 500,
    timestamp: new Date().toISOString()
  });

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  const data = err.data || null;

  res.status(status).json({
    message: message,
    data: data,
    success: false,
    fail: true,
    timestamp: new Date().toISOString()
  });
});

//BAFS: Capturar 404 - Debe ser después de todas las rutas
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
    data: null,
    success: false,
    fail: true,
    timestamp: new Date().toISOString()
  });
});

//CGAC: Exportar para usar en index.js
export default app;
