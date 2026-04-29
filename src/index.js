//NOTA H.2: Servidor de inicio - Punto H
//Punto de entrada principal de la aplicación

import app from './app.js';
import config from './config/config.js';

//MASU: Determinar puerto con fallback chain
const port = app.get('port') || config.PORT || process.env.PORT || 3000;

//CGAC: Crear servidor HTTP
const server = app.listen(port, () => {
  console.log('\n' + '='.repeat(60));
  console.log('SERVIDOR INICIADO EXITOSAMENTE');
  console.log('='.repeat(60));
  console.log(`
  Aplicación: ${config.APP_NAME}
  Versión: ${config.APP_VERSION}
  Host: http://localhost:${port}
  Puerto: ${port}
  Ambiente: ${config.NODE_ENV}
  
  API Endpoints:
     - GET    ${config.API_URL}              (Información API)
     - GET    ${config.API_URL}/institutos     (Listar institutos)
     - GET    ${config.API_URL}/institutos/:id (Obtener uno)
     - POST   ${config.API_URL}/institutos     (Crear)
     - PUT    ${config.API_URL}/institutos/:id (Actualizar)
     - DELETE ${config.API_URL}/institutos/:id (Eliminar)
  
  Documentación: ${config.API_URL}/api-docs
  Iniciado en: ${new Date().toLocaleString()}
  `);
  console.log('='.repeat(60) + '\n');
});

//BAFS: Capturar error EADDRINUSE (puerto en uso)
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\nERROR: El puerto ${port} ya está en uso`);
    console.error('   Opciones:');
    console.error(`   - Cambiar puerto: PORT=${port + 1} node index.js`);
    console.error('   - Matar proceso: lsof -ti :' + port + ' | xargs kill -9');
    process.exit(1);
  } else {
    console.error('Error del servidor:', error.message);
    process.exit(1);
  }
});

//JAPV: Capturar SIGTERM e SIGINT para shutdown graceful
const gracefulShutdown = (signal) => {
  console.log(`\nSeñal ${signal} recibida. Cerrando servidor...`);
  
  server.close(() => {
    console.log('Servidor cerrado exitosamente');
    console.log(`Tiempo de ejecución: ${Math.round(process.uptime())} segundos\n`);
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Fallo al cerrar servidor en tiempo límite, forzando salida...');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

//CDCH: Capturar promesas rechazadas no manejadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada sin manejar:', {
    reason: reason,
    promise: promise
  });
  process.exit(1);
});

//AGU: Capturar excepciones no capturadas
process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});
