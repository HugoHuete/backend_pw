import { Request, Response } from 'express';
import { InferAttributes, WhereOptions, Op } from 'sequelize';
import { Purchase, Supplier } from '../models/';

export class PurchaseControllers {
  create = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const purchase = Purchase.build(body);
      await purchase.save();
      return res.json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error al crear compra - Hable con el administrador',
      });
    }
  };

  findAll = async (req: Request, res: Response) => {
    const query = req.query;
    const whereOptions: WhereOptions<InferAttributes<Purchase>> = {};

    // Validate if startdate and endDate are in query
    if (query['start-date']) {
      const startDate = new Date(String(query['start-date']));
      whereOptions.date = { [Op.gte]: startDate };
    }
    if (query['end-date']) {
      const endDate = new Date(String(query['end-date']));
      whereOptions.date = { [Op.lte]: endDate };
    }
    // Validate if supplier_id is in query
    query.supplier ? (whereOptions.supplier_id = Number(query.supplier)) : '';

    try {
      const purchases = await Purchase.findAll({
        include: { model: Supplier, attributes: ['name'] },
        where: whereOptions,
      });
      return res.json({ purchases });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: 'Error al obtener las compras - Hable con el administrador',
      });
    }
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const purchase = await Purchase.findByPk(id);
      return res.json(purchase);
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
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        return res.status(404).json({ msg: 'Proveedor no encontrado' });
      }
      purchase.update(body);
      return res.json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error al actualizar el proveedor - Hable con el administrador',
      });
    }
  };

  deactivate = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        return res.status(404).json({ msg: 'Compra no encontrada' });
      }

      if (!purchase.dataValues.status) {
        return res.status(400).json({ msg: 'Proveedor ya se encuentra eliminado' });
      }

      purchase.update({ status: false });
      return res.json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error al eliminar el proveedor - Hable con el administrador',
      });
    }
  };
}
