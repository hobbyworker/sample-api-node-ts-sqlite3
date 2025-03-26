import { Request, Response } from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../models/item.model';

// CREATE
export async function createItemController(req: Request, res: Response): Promise<void> {
  try {
    const { name, description } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name is required.' });
      return;
    }
    const newItem = await createItem(name, description);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error occurred while creating the item.' });
  }
}

// READ - ALL
export async function getAllItemsController(req: Request, res: Response): Promise<void> {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error occurred while retrieving items.' });
  }
}

// READ - ONE
export async function getItemByIdController(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const item = await getItemById(Number(id));
    if (!item) {
      res.status(404).json({ error: 'Item not found.' });
      return;
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error occurred while retrieving the item.' });
  }
}

// UPDATE
export async function updateItemController(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await updateItem(Number(id), name, description);
    if (result.changes === 0) {
      res.status(404).json({ error: 'No item found to update.' });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error occurred while updating the item.' });
  }
}

// DELETE
export async function deleteItemController(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await deleteItem(Number(id));
    if (result.changes === 0) {
      res.status(404).json({ error: 'No item found to delete.' });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error occurred while deleting the item.' });
  }
}
