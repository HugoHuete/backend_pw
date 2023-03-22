import { Request, Response } from 'express';
import { InferAttributes, WhereOptions, Op } from 'sequelize';
import { Purchase, Supplier } from '../models/';

export class PurchaseControllers {
  // Create a purchase
  create = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const purchase = Purchase.build(body);
      await purchase.save();
      return res.status(201).json({ code: 201, data: purchase, error: false });
    } catch (err) {
      const data = 'Error at creating purchase - Talk to admin';
      return res.status(500).json({ code: 500, data, error: true });
    }
  };

  // Find all purchases. Optional queries: supplier_id, startdate, enddate
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
      return res.json({ code: 200, data: purchases, error: false });
    } catch (err) {
      const data = 'Error getting purchases - Talk to admin.';
      return res.status(500).json({ code: 500, data, error: true });
    }
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const purchase = await Purchase.findByPk(id, {
        include: { model: Supplier, attributes: ['name'] },
      });

      if (!purchase) {
        const data = `Purchase with id (${id}) not found.`;
        return res.status(404).json({ code: 404, data, error: true });
      }

      return res.json({ code: 200, data: purchase, error: false });
    } catch (err) {
      const data = 'Error getting purchase - Talk to admin.';
      return res.status(500).json({ code: 500, data, error: true });
    }
  };

  update = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        const data = `Purchase with id (${id}) not found.`;
        return res.status(404).json({ code: 404, data, error: true });
      }
      purchase.update(body);
      return res.json({ code: 200, data: purchase, error: false });
    } catch (err) {
      const data = 'Error updating purchase - talk to admin';
      return res.status(500).json({ code: 500, data, error: true });
    }
  };

  deactivate = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        const data = `Purchase with id (${id}) not found.`;
        return res.status(404).json({ code: 404, data, error: true });
      }

      purchase.update({ deleted: true });
      return res.json(purchase);
    } catch (err) {
      const data = 'Error deleting purchase - talk to admin';
      return res.status(500).json({ code: 500, data, error: true });
    }
  };
}
