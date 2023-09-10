import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
import { validateBody } from '../../decorators/index.js';
import * as contactsSchema from '../../models/Contact.js';
import { isValidId } from '../../middlewares/index.js';

const contactAddValidate = validateBody(contactsSchema.contactsAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactsSchema.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', isValidId, contactsController.getOneContact);

contactsRouter.post('/', contactAddValidate, contactsController.postContact);

contactsRouter.put(
  '/:contactId',
  isValidId,
  contactAddValidate,
  contactsController.changeContact
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.changeContact
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  contactsController.deleteContact
);

export default contactsRouter;
