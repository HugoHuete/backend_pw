import { Supplier } from '../models';

const supplierNameExists = async (name:unknown) => {
  // If not name or name is not a string, dont check anything more
  if (!name || typeof name !== 'string')
  {
    return;
  }
  const supplier = await Supplier.findOne({where:{name}});

  if(supplier){
    throw new Error();
  }

};

const supplierIdExists = async (id:unknown) => {
  if (!id || typeof id !== 'string')
  {
    return;
  }

  const supplier = await Supplier.findByPk(id);

  if(supplier){
    throw new Error();
  }
};

export {supplierNameExists, supplierIdExists};