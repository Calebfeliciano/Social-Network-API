import { Request, Response } from 'express';
import { AccountModel } from '../models/Account.js';
import { PostModel } from '../models/Post.js';

export const accountController = {
  async listAccounts(_: Request, res: Response) {
    try {
      const users = await AccountModel.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve accounts', details: err });
    }
  },

  async getAccountById(req: Request, res: Response) {
    try {
      const user = await AccountModel.findById(req.params.accountId)
        .populate('thoughts')
        .populate('friends');

      if (!user) return res.status(404).json({ message: 'Account not found' });

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Could not retrieve account', details: err });
    }
  },

  async createAccount(req: Request, res: Response) {
    try {
      const user = await AccountModel.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to create account', details: err });
    }
  },

  async updateAccount(req: Request, res: Response) {
    try {
      const updatedUser = await AccountModel.findByIdAndUpdate(
        req.params.accountId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedUser) return res.status(404).json({ message: 'Account not found' });

      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to update account', details: err });
    }
  },

  async removeAccount(req: Request, res: Response) {
    try {
      const deletedUser = await AccountModel.findByIdAndDelete(req.params.accountId);

      if (!deletedUser) return res.status(404).json({ message: 'Account not found' });

      await PostModel.deleteMany({ _id: { $in: deletedUser.thoughts } });

      return res.json({ message: 'Account and posts removed!' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete account', details: err });
    }
  },

  async addFriend(req: Request, res: Response) {
    try {
      const updated = await AccountModel.findByIdAndUpdate(
        req.params.accountId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: 'Account not found' });

      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ error: 'Could not add friend', details: err });
    }
  },

  async removeFriend(req: Request, res: Response) {
    try {
      const updated = await AccountModel.findByIdAndUpdate(
        req.params.accountId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: 'Account not found' });

      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ error: 'Could not remove friend', details: err });
    }
  }
};
