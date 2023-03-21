import { Request, Response } from 'express';
import { InferAttributes, WhereOptions, Op } from 'sequelize';
import { Purchase, Supplier } from '../models/';

export class PurchaseControllers {
  create = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const purchase = Purchase.build(body);
      await purchase.save();
      return res.status(201).json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error at creating purchase - Talk to admin',
      });
    }
  };

  findAll = async (req: Request, res: Response) => {
    const { supplier, startDate, endDate } = req.query;
    const whereOptions: WhereOptions<InferAttributes<Purchase>> = {};

    // Validate if supplier_id is in query
    supplier ? (whereOptions.supplier_id = Number(supplier)) : '';

    // Validate if startdate and endDate are in query
    if (startDate) {
      const start = new Date(String(startDate));
      whereOptions.date = { [Op.gte]: start };
    }
    if (endDate) {
      const end = new Date(String(endDate));
      whereOptions.date = { [Op.lte]: end };
    }

    // Try to get purchases with where options
    try {
      const purchases = await Purchase.findAll({
        include: { model: Supplier, attributes: ['name'] },
        where: whereOptions,
        order: ['id'],
      });
      const total = await Purchase.count({ where: whereOptions });
      return res.json({ total, purchases });
    } catch (error) {
      return res.status(500).json({
        msg: 'Error getting purchases - Talk to admin.',
      });
    }
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const purchase = await Purchase.findByPk(id, {
        include: { model: Supplier, attributes: ['name'] },
      });

      if (!purchase) {
        return res.status(404).json({ msg: `Purchase with id (${id}) not found.` });
      }

      return res.json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error getting purchase - Talk to admin',
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        return res.status(404).json({ msg: `Purchase with id (${id}) not found.` });
      }
      purchase.update(body);
      return res.json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error updating purchase - talk to admin',
      });
    }
  };

  deactivate = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        return res.status(404).json({ msg: `Purchase with id (${id}) not found.` });
      }

      purchase.update({ deleted: true });
      return res.json(purchase);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error deleting purchase - talk to admin',
      });
    }
  };
}
