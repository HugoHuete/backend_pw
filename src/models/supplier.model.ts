import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Supplier = db.define(
  'supplier',
  {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: false },
);

export { Supplier };
