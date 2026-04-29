//NOTA E.1: Servicios para Institutos - Punto E
//MASU: Lógica de negocio y operaciones CRUD para el submódulo de Institutos

import Institutos from "../models/Institutos.js";
import boom from '@hapi/boom';

//CGAC: GET - LISTAR TODOS LOS INSTITUTOS
export const getInstitutosList = async () => {
  let institutosList;
  try {
    institutosList = await Institutos.find();
    
    if (!institutosList || institutosList.length === 0) {
      throw boom.notFound('No se encontraron institutos registrados.');
    }
    
    return institutosList;
  } catch (error) {
    if (error.isBoom) {
      throw error;
    }
    throw boom.internal(error.message);
  }
};

//JAPV: GET - OBTENER UN INSTITUTO POR ID
export const getInstitutoItem = async (id, keyType = 'OK') => {
  let institutoItem;

  try {
    if (keyType !== 'OK' && keyType !== 'BK') {
      throw boom.badRequest('keyType debe ser "OK" o "BK"');
    }

    if (keyType === 'OK') {
      institutoItem = await Institutos.findByIdOK(id);
    } else if (keyType === 'BK') {
      institutoItem = await Institutos.findByIdBK(id);
    }

    if (!institutoItem) {
      throw boom.notFound(`Instituto con ${keyType === 'OK' ? 'IdInstitutoOK' : 'IdInstitutoBK'}: ${id} no encontrado.`);
    }

    return institutoItem;
  } catch (error) {
    if (error.isBoom) {
      throw error;
    }
    throw boom.internal(error.message);
  }
};

//BAFS: POST - CREAR NUEVO INSTITUTO
export const postInstitutos = async (paInstitutoItem) => {
  try {
    if (!paInstitutoItem.IdInstitutoOK) {
      throw boom.badRequest('IdInstitutoOK es requerido');
    }
    if (!paInstitutoItem.IdInstitutoBK) {
      throw boom.badRequest('IdInstitutoBK es requerido');
    }
    if (!paInstitutoItem.DesInstituto) {
      throw boom.badRequest('DesInstituto es requerido');
    }

    const existeOK = await Institutos.findByIdOK(paInstitutoItem.IdInstitutoOK);
    const existeBK = await Institutos.findByIdBK(paInstitutoItem.IdInstitutoBK);

    if (existeOK) {
      throw boom.conflict(`IdInstitutoOK "${paInstitutoItem.IdInstitutoOK}" ya existe en el sistema`);
    }
    if (existeBK) {
      throw boom.conflict(`IdInstitutoBK "${paInstitutoItem.IdInstitutoBK}" ya existe en el sistema`);
    }

    const newInstitutoItem = new Institutos(paInstitutoItem);
    const institutCreated = await newInstitutoItem.save();

    return institutCreated;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      throw boom.conflict(`${field} ya existe en el sistema`);
    }
    if (error.isBoom) {
      throw error;
    }
    throw boom.badImplementation(error.message);
  }
};

//CDCH: PUT - ACTUALIZAR INSTITUTO EXISTENTE
export const putInstitutoItem = async (id, paInstitutoItem) => {
  try {
    const institutoExistente = await Institutos.findByIdOK(id);
    
    if (!institutoExistente) {
      throw boom.notFound(`Instituto con IdInstitutoOK: ${id} no encontrado para actualizar`);
    }

    if (paInstitutoItem.IdInstitutoOK || paInstitutoItem.IdInstitutoBK) {
      throw boom.badRequest('No se pueden modificar los identificadores únicos (IdInstitutoOK, IdInstitutoBK)');
    }

    const institutUpdated = await Institutos.findOneAndUpdate(
      { IdInstitutoOK: id },
      paInstitutoItem,
      { 
        new: true,
        runValidators: true
      }
    );

    return institutUpdated;
  } catch (error) {
    if (error.isBoom) {
      throw error;
    }
    throw boom.badImplementation(error.message);
  }
};

//AGU: DELETE - ELIMINAR INSTITUTO
export const deleteInstitutoItem = async (id) => {
  try {
    const institutoExistente = await Institutos.findByIdOK(id);
    
    if (!institutoExistente) {
      throw boom.notFound(`Instituto con IdInstitutoOK: ${id} no encontrado para eliminar`);
    }

    const institutDeleted = await Institutos.findOneAndDelete(
      { IdInstitutoOK: id }
    );

    return institutDeleted;
  } catch (error) {
    if (error.isBoom) {
      throw error;
    }
    throw boom.badImplementation(error.message);
  }
};

//BAFS: SERVICIOS UTILITARIOS - SUBDOCUMENTOS (Arrays)
export const pushObjToSubdocument = async (id, objToAdd, fieldName) => {
  try {
    const institutUpdated = await Institutos.findOneAndUpdate(
      { IdInstitutoBK: id },
      { $push: { [fieldName]: objToAdd } },
      { new: true }
    );
    
    if (!institutUpdated) {
      return { success: false, error: 'Instituto no encontrado' };
    }
    
    return { success: true, institutUpdated };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//MASU: ACTUALIZAR ELEMENTO EN SUBDOCUMENTO
export const updateObjInSubdocument = async (id, objToUpdate, fieldName) => {
  try {
    const institutUpdated = await Institutos.findOneAndUpdate(
      { IdInstitutoOK: id },
      { $set: { [fieldName]: objToUpdate } },
      { new: true }
    );
    
    if (!institutUpdated) {
      return { success: false, error: 'Instituto no encontrado' };
    }
    
    return { success: true, institutUpdated };
  } catch (error) {
    return { success: false, error: error.message };
  }
};