//CGAC: Education - Rutas principales
import { Router } from 'express'; 
import config from '../../../config/config'; 
import institutosRoutes from './institutos.routes'; 

//MASU: Configuración de rutas de API
const routerAPI = (app) => { 
  const router = Router(); 
  const api = config.API_URL; 
  app.use(api, router); 
  router.use('/institutos', institutosRoutes); 
  return router; 
}; 

module.exports = routerAPI;