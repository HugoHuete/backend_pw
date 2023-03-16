import db from '../db/connection';
import { DataTypes } from 'sequelize';
import { Supplier } from './supplier.model';

const Purchase = db.define(
  'purchase',
  {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
    supplier_id: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    received_date: { type: DataTypes.DATE, allowNull: false },
    exchange_rate: { type: DataTypes.NUMBER, allowNull: false },
    purchase_link: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
  },
  { timestamps: false },
);

Purchase.belongsTo(Supplier, { as:'supplier' ,foreignKey: 'supplierId' });
Supplier.hasMany(Purchase);

export { Purchase };
