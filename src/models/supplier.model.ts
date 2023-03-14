import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Supplier = db.define(
  'suppliers',
  {
    name: { type: DataTypes.STRING },
  },
  { timestamps: false },
);

export default Supplier;
