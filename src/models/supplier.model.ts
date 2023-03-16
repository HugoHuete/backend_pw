import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Supplier = db.define(
  'supplier',
  {
    name: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: false },
);

export { Supplier };
