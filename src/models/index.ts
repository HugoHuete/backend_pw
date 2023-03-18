import { Purchase } from './purchases.model';
import { Supplier } from './supplier.model';

// Relationships

// Relationship betwee Supplier and Purchase
Supplier.hasMany(Purchase, {
  foreignKey:'supplier_id', as: 'purchases'
});





export {Supplier, Purchase };