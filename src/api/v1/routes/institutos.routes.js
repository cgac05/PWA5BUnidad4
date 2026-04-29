//NOTA G.1: Ruteos para Institutos - Punto G
//CGAC: Definición de todas las rutas (endpoints) para el submódulo de Institutos

import { Router } from 'express'; 
import * as InstitutosController from '../controllers/institutos.controller.js'; 

const router = Router();

//JAPV: RUTAS GET - LECTURA
//API 1.1: Listar todos los institutos
router.get('/', InstitutosController.getInstitutosList);

//API 1.2: Obtener un instituto específico por ID
router.get('/:id', InstitutosController.getInstitutoItem);

//BAFS: RUTAS POST - CREACIÓN
//API 1.3: Crear nuevo instituto
router.post('/', InstitutosController.postInstitutoItem);

//CDCH: RUTAS PUT - ACTUALIZACIÓN
//API 1.4: Actualizar un instituto existente
router.put('/:id', InstitutosController.putInstitutoItem);

//AGU: RUTAS DELETE - ELIMINACIÓN
//API 1.5: Eliminar un instituto
router.delete('/:id', InstitutosController.deleteInstitutoItem);

//BAFS: RUTAS AUXILIARES - SUBDOCUMENTOS
//Agregar a subdocumento (array)
router.post('/:id/:fieldName', InstitutosController.pushElementToSubdocument);

export default router;  