import type { Request, Response } from 'express';

import Qurban from '../models/Qurban';
import QurbanType from '../models/QurbanType';
import cloudinary from '../utils/cloudinary';
import sanitizeObject from '../helpers/sanitizeObject';

export const getAllQurban = async (req: Request, res: Response) => {
  const { id, projection } = req.query;

  const _projection = (projection as string) || '';
  const trustedProjection = sanitizeObject(_projection);
  try {
    const qurbanList = await Qurban.findById(id);
    if (id && qurbanList) {
      res.json(qurbanList);
      return;
    } else {
      const qurbanList = await Qurban.find({}, trustedProjection).sort({ date: -1 });
      if (qurbanList) res.json(qurbanList);
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error });
  }
};

export const deleteQurban = async (req: Request, res: Response) => {
  try {
    const id = req.query.id || 0;
    const qurban = await Qurban.findById(id);
    const { image } = qurban || {};
    const { deletedCount } = await Qurban.deleteOne({ _id: id });
    if (deletedCount > 0) {
      const { id: publicId } = image || {};
      if (publicId) {
        const { result } = await cloudinary.uploader.destroy(publicId);
        if (result === 'ok') {
          res.json({ is_success: 1, message: `Success delete Qurban data` });
          return;
        }
      }
      res.json({ is_success: 1, message: `Success delete Qurban data` });
      return;
    }
    res.json({ is_success: 0, message: `Failed delete Qurban data` });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error });
  }
};

export const addQurban = async (req: any, res: Response) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    const result = await cloudinary.uploader.upload(req.file.path, { use_filename: true, unique_filename: false });
    const qurban = new Qurban({
      image: { photos: result.secure_url || '', id: result.public_id || '' },
      name: req.body.name,
      weight: req.body.weight,
      qurban_type: req.body.qurban_type,
      price: req.body.price,
      desc: req.body.desc,
      quota: req.body.quota,
    });
    await qurban.save();
    res.json({ is_success: 1, message: `Success add Qurban data` });
  } catch (error) {
    console.error(error);
  }
};
export const updateQurban = async (req: Request, res: Response) => {
  const id = req.query.id || 0;
  const total = Number(req.query.total) || 0;
  try {
    if (id) {
      const qurbanUpdated = await Qurban.findOneAndUpdate({ _id: id }, { $inc: { quota: total * -1 } }, { new: true });
      res.json(qurbanUpdated);
    } else {
      const qurbanUpdated = await Qurban.find();
      res.json(qurbanUpdated);
    }
  } catch (error) {
    console.error(error);

    res.status(401).json({ message: error });
  }
};

export const getType = async (req: Request, res: Response) => {
  const id = req.query.id || 0;
  try {
    if (id) {
      const qurbanType = await QurbanType.findById(id);
      res.json(qurbanType);
    } else {
      const qurbanType = await QurbanType.find();
      res.json(qurbanType);
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error });
  }
};

export const deleteType = async (req: Request, res: Response) => {
  try {
    const id = req.query.id || 0;
    const resp = await QurbanType.deleteOne({ _id: id });
    if (resp.deletedCount > 0) {
      res.json({ is_success: 1, message: `Success delete Tipe Qurban` });
      return;
    }
    res.json({ is_success: 0, message: `Failed delete Tipe Qurban` });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error });
  }
};

export const postType = async (req: Request, res: Response) => {
  try {
    const qurban = new QurbanType({
      name: req.body.name,
      type: req.body.type,
    });
    await qurban.save();
    res.json({ is_success: 1, message: `Success add Qurban type` });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error });
  }
};
