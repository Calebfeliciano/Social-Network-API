import { Router } from 'express';
import { accountController } from '../../controllers/account-controller.js'; 

const accountRouter = Router();

// /api/accounts
accountRouter.route('/')
  .get(accountController.listAccounts)
  .post(accountController.createAccount);

// /api/accounts/:accountId
accountRouter.route('/:accountId')
  .get(accountController.getAccountById)
  .put(accountController.updateAccount)
  .delete(accountController.removeAccount);

// /api/accounts/:accountId/friends/:friendId
accountRouter.route('/:accountId/friends/:friendId')
  .post(accountController.addFriend)
  .delete(accountController.removeFriend);

export default accountRouter;
