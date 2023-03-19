import { Purchase } from './purchase.model';
import { Supplier } from './supplier.model';

// Relationships

// Relationship betwee Supplier and Purchase
Supplier.hasMany(Purchase, {
  foreignKey:'supplier_id'
});
Purchase.belongsTo(Supplier, {
  foreignKey:'supplier_id'
});





export {Supplier, Purchase };