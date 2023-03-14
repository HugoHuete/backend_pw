import { Request, Response } from 'express';
import Supplier from '../models/supplier.model';

const createSupplier = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // Check if the supplier is not created
    const supplierExists = await Supplier.findOne({
      where: {
        name: body.name,
      },
    });

    if (supplierExists) {
      return res.status(404).json({ msg: `El proveedor ${body.name} ya está registrado.` });
    }

    // If it doesn't exist, create it
    const supplier = Supplier.build(body);
    await supplier.save();
    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al crear proveedor - Hable con el administrador',
    });
  }
};

const getSuppliers = async (_req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.findAll();
    return res.json({ suppliers });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener los proveedores - Hable con el administrador',
    });
  }
};

const getSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener el proveedor - Hable con el administrador',
    });
  }
};

const updateSupplier = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ msg: 'Usuario no existe.' });
    }

    supplier.update(body);

    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener el proveedor - Hable con el administrador',
    });
  }
};

export { createSupplier, getSuppliers, getSupplier, updateSupplier };
