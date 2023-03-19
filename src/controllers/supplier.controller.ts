import { Request, Response } from 'express';
import db from '../db/connection';
import { Purchase, Supplier } from '../models/';

export class SupplierControllers {
  create = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const supplier = Supplier.build(body);
      await supplier.save();
      return res.status(201).json(supplier);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error al crear proveedor - Hable con el administrador',
      });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const totalSuppliers = await Supplier.count({ where: { status: true } });
      const suppliers = await Supplier.findAll({
        attributes:['id', 'name', [db.fn('COUNT', db.col('Purchases.id')), 'compras_totales']],
        where: { status: true },
        order: ['id'],
        include: {
          model: Purchase,
          attributes:[]
        },
        group:['Supplier.id'],
      });
      return res.json({ total: totalSuppliers, suppliers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'Error al obtener los proveedores - Hable con el administrador',
      });
    }
  };

  findById = async (req: Request, res: Response) => {
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

  getPurchases = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const supplier = await Supplier.findByPk(id);
      const purchases = await supplier?.getPurchases();
      const totalPurchases = await supplier?.countPurchases();

      return res.json({ total: totalPurchases, purchases });
    } catch (error) {
      return res.status(500).json({
        msg: 'Error al obtener el proveedor - Hable con el administrador',
      });
    }
  };

  update = async (req: Request, res: Response) => {
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

  deactivate = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const supplier = await Supplier.findByPk(id);

      if (!supplier?.dataValues.status) {
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
}
