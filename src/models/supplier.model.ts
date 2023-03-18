import db from '../db/connection';
import {
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { Purchase } from './purchases.model';

class Supplier extends Model<InferAttributes<Supplier>, InferCreationAttributes<Supplier>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status: boolean;

  declare getPurchases: HasManyGetAssociationsMixin<Purchase>;
  declare addPurchase: HasManyAddAssociationMixin<Purchase, number>;
  declare countPurchases: HasManyCountAssociationsMixin;
  declare createPurchase: HasManyCreateAssociationMixin<Purchase>;
}

Supplier.init(
  {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'suppliers', sequelize: db, timestamps: false },
);


export { Supplier };
