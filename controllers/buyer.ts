import type { Request, Response } from 'express';

import { ZodError } from 'zod';

import Buyer from '../models/Buyer';
import Qurban from '../models/Qurban';
import sanitizeObject from '../helpers/sanitizeObject';
import BuyerData from '../validation/buyer';

export const getAllBuyer = async (req: Request, res: Response) => {
  const { id, qurbanId, projection } = req.query;
  const _projection = (projection as string) || '';
  const trustedProjection = sanitizeObject(_projection);
  try {
    if (id) {
      const buyerData = await Buyer.findById(id).sort({ date: -1 });
      res.json(buyerData);
    }
    if (qurbanId) {
      const buyerData = await Buyer.find({ qurbanId: qurbanId }).sort({ date: -1 });
      res.json(buyerData);
    } else {
      const buyerData = await Buyer.find({}, trustedProjection).sort({ date: -1 });
      res.json(buyerData);
    }
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
};

export const postBuyer = async (req: Request, res: Response) => {
  try {
    const validatedData = BuyerData.parse(req.body);
    if (validatedData) {
      const { name, address, handphone, qurban, description, hasPaid } = req.body;
      const parsedQurban = JSON.parse(qurban);
      const qurbanId = parsedQurban.qurban_id;
      const buyer = new Buyer({
        name: name,
        address: address,
        handphone: handphone,
        qurban: parsedQurban,
        desc: description,
        has_paid: hasPaid,
      });
      const resp = await buyer.save();
      if (qurbanId && resp.name) {
        await Qurban.findByIdAndUpdate(qurbanId, { $inc: { quota: -1 } }, { new: true });
      }
      res.json({ is_success: 1, message: `Success add Qurban's buyer` });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return { is_success: 0, message: error.flatten() };
    } else res.json({ is_success: 0, message: error });
  }
};
export const deleteBuyer = async (req: Request, res: Response) => {
  try {
    const id = req.query.id || 0;
    if (!id) {
      res.json({ is_success: 0, message: `Need Id` });
      return;
    }
    const resp = await Buyer.deleteOne({ _id: id });
    if (resp.deletedCount > 0) {
      res.json({ is_success: 1, message: `Success delete Buyer data` });
      return;
    }
    res.json({ is_success: 0, message: `Failed delete Buyer data` });
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
};

export const updatePaid = async (req: Request, res: Response) => {
  const id = req.query.id || 0;
  try {
    if (id) {
      await Buyer.findByIdAndUpdate(id, { has_paid: true }, { new: true });
      res.json({ is_success: 1, message: 'Berhasil mengupdate kelunasan' });
      return;
    }
    res.json({ is_success: 0, message: 'Gagal mengupdate kelunasan' });
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
};
