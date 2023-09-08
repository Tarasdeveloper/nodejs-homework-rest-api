import contactsSchema from '../schemas/contacts-schema.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Contact from '../models/Contact.js';

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getOneContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsService.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${contactId} not found`);
//   }
//   res.json(result);
// };

// const postContact = async (req, res) => {
//   const result = await contactsService.addContact(req.body);
//   res.status(201).json(result);
// };

// const changeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsService.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${contactId} not found`);
//   }
//   res.json(result);
// };

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsService.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${contactId} not found`);
//   }
//   res.json({
//     message: 'Delete successfull',
//   });
// };

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getOneContact: ctrlWrapper(getOneContact),
  // postContact: ctrlWrapper(postContact),
  // changeContact: ctrlWrapper(changeContact),
  // deleteContact: ctrlWrapper(deleteContact),
};
