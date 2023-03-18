import { Purchase, Supplier } from '../models';
import { Model, ModelStatic } from 'sequelize';

const nameNotExists = async (name: unknown, model: ModelStatic<Model>) => {
  // If not name or name is not a string, dont check anything more
  if (!name) {
    throw new Error('El nombre es requerido.');
  }
  
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('El nombre debe ser un string no vacío.');
  }

  const entity = await model.findOne({ where: { name } });

  if (entity) {
    throw new Error(`Ya existe un registro con el nombre: ${name}.`);
  }
};

const idExists = async (id: unknown, model: ModelStatic<Model>) => {
  // Check if id is given
  if (!id) {
    throw new Error('El id es requerido.');
  }

  // Check if number
  const idAsNum = Number(id);
  if (isNaN(idAsNum)) {
    throw new Error('El id tiene que ser de tipo numerico.');
  }
  // Check if id is in db
  const entity = await model.findByPk(idAsNum);
  if (entity) {
    return;
  }
  throw new Error('El id de ese proveedor no existe');
};


// Supplier checks
const supplierIdExists = async (id: unknown) => {
  await idExists(id, Supplier);
};
const supplierNameNotExists = async (id: unknown) => {
  await nameNotExists(id, Supplier);
};

// Purchase checks
const purchaseIdExists = async (id: unknown) => {
  await idExists(id, Purchase);
};
const purchaseNameNotExists = async (id: unknown) => {
  await nameNotExists(id, Purchase);
};

export { supplierIdExists, supplierNameNotExists, purchaseIdExists, purchaseNameNotExists };
