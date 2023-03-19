import db from '../db/connection';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { Supplier } from './supplier.model';

class Purchase extends Model<InferAttributes<Purchase>, InferCreationAttributes<Purchase>> {
  declare id: CreationOptional<number>;
  declare date: Date;
  declare supplier_id: number;
  declare status: boolean;
  declare received_date: CreationOptional<Date>;
  declare exchange_rate: CreationOptional<number>;
  declare purchase_link: CreationOptional<string>;
  declare comment: CreationOptional<string>;
}

Purchase.init(
  {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Supplier, key: 'id' },
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    received_date: { type: DataTypes.DATE },
    exchange_rate: { type: DataTypes.NUMBER, allowNull: false },
    purchase_link: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
  },
  { tableName: 'purchases',  sequelize: db },
);

export { Purchase };
