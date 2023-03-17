import { Request, Response } from 'express';
import { Supplier } from '../models/';

const createSupplier = async (req: Request, res: Response) => {
  const { body } = req;
  try {
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
    console.error(error);
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
      return res.status(404).json({ msg: 'Proveedor no encontrado' });
    }
    supplier.update(body);
    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar el proveedor - Hable con el administrador',
    });
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ msg: 'Proveedor no encontrado' });
    }

    if (!supplier.dataValues.status) {
      return res.status(400).json({ msg: 'Proveedor ya se encuentra eliminado' });
    }

    supplier.update({ status: false });
    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al eliminar el proveedor - Hable con el administrador',
    });
  }
};

export { createSupplier, getSuppliers, getSupplier, updateSupplier, deleteSupplier };
