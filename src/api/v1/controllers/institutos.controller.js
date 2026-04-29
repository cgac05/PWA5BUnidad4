//NOTA F.1: Controladores para Institutos - Punto F
//MASU: Manejo de requests HTTP y coordinación con servicios

import * as InstitutosServices from '../services/institutos.service.js';
import boom from '@hapi/boom';
import { OK, FAIL } from '../../../middlewares/resp.handler.js';

//CGAC: GET - LISTAR TODOS
export const getInstitutosList = async (req, res, next) => {
  try {
    const institutosList = await InstitutosServices.getInstitutosList();
    res.status(200).json(institutosList);
  } catch (error) {
    next(error);
  }
};

//JAPV: GET - OBTENER UNO
export const getInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';

    if (!id || id.trim() === '') {
      return res.status(400).json(
        FAIL('El identificador (id) es requerido')
      );
    }

    const institutoItem = await InstitutosServices.getInstitutoItem(id, keyType);
    res.status(200).json(institutoItem);

  } catch (error) {
    next(error);
  }
};

//BAFS: POST - CREAR
export const postInstitutoItem = async (req, res, next) => {
  try {
    const newInstituto = req.body;

    if (!newInstituto || Object.keys(newInstituto).length === 0) {
      return res.status(400).json(
        FAIL('El cuerpo de la solicitud no puede estar vacío')
      );
    }

    const institutoCreated = await InstitutosServices.postInstitutos(newInstituto);

    res.status(201).json(
      OK('Instituto agregado correctamente al catálogo.', institutoCreated)
    );

  } catch (error) {
    if (error.isBoom && error.output.statusCode === 409) {
      return res.status(409).json(
        FAIL(error.message, error.data)
      );
    }

    if (error.isBoom && error.output.statusCode === 400) {
      return res.status(400).json(
        FAIL(error.message, error.data)
      );
    }

    next(error);
  }
};

//CDCH: PUT - ACTUALIZAR
export const putInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paInstitutoItem = req.body;

    if (!id || id.trim() === '') {
      return res.status(400).json(
        FAIL('El identificador (id) es requerido para actualizar')
      );
    }

    if (!paInstitutoItem || Object.keys(paInstitutoItem).length === 0) {
      return res.status(400).json(
        FAIL('Debe proporcionar al menos un campo para actualizar')
      );
    }

    if (paInstitutoItem.IdInstitutoOK || paInstitutoItem.IdInstitutoBK) {
      return res.status(400).json(
        FAIL('No se pueden modificar los identificadores únicos (IdInstitutoOK, IdInstitutoBK)')
      );
    }

    const institutoUpdated = await InstitutosServices.putInstitutoItem(id, paInstitutoItem);

    if (!institutoUpdated) {
      return res.status(404).json(
        FAIL('Instituto no encontrado para actualizar')
      );
    }

    res.status(200).json(institutoUpdated);

  } catch (error) {
    if (error.isBoom && error.output.statusCode === 404) {
      return res.status(404).json(
        FAIL(error.message)
      );
    }

    if (error.isBoom && error.output.statusCode === 400) {
      return res.status(400).json(
        FAIL(error.message)
      );
    }

    next(error);
  }
};

//AGU: DELETE - ELIMINAR
export const deleteInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === '') {
      return res.status(400).json(
        FAIL('El identificador (id) es requerido para eliminar')
      );
    }

    const institutDeleted = await InstitutosServices.deleteInstitutoItem(id);

    if (!institutDeleted) {
      return res.status(404).json(
        FAIL('Instituto no encontrado para eliminar')
      );
    }

    res.status(200).json(
      OK('Instituto eliminado correctamente del catálogo.', institutDeleted)
    );

  } catch (error) {
    if (error.isBoom && error.output.statusCode === 404) {
      return res.status(404).json(
        FAIL(error.message)
      );
    }

    next(error);
  }
};

//BAFS: CONTROLADOR AUXILIAR - AGREGAR A ARRAY
export const pushElementToSubdocument = async (req, res, next) => {
  try {
    const { id, fieldName } = req.params;
    const objToAdd = req.body;
    
    const result = await InstitutosServices.pushObjToSubdocument(id, objToAdd, fieldName);
    
    if (!result.success) {
      return res.status(400).json(
        FAIL('No se pudo agregar el elemento', result.error)
      );
    }
    
    res.status(200).json(
      OK('Elemento agregado correctamente', result.institutUpdated)
    );
  } catch (error) {
    next(error);
  }
};