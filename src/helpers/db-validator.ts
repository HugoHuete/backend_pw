import { Purchase, Supplier } from '../models';
import { Model, ModelStatic } from 'sequelize';
import { DateTime } from 'luxon';

const checkDateFormat = (date: string) => {
  // yyyy-mm-dd
  const dateFormatted = DateTime.fromISO(date);

  if (!dateFormatted.isValid) {
    throw new Error('Invalid date.');
  }
  return true;
};

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

// Supplier checks
const supplierNameNotExists = async (id: unknown) => {
  await nameNotExists(id, Supplier);
};

// Purchase checks
const purchaseNameNotExists = async (id: unknown) => {
  await nameNotExists(id, Purchase);
};

export { supplierNameNotExists, purchaseNameNotExists, checkDateFormat };
