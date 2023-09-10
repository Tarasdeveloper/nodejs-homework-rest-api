import Contact from '../models/Contact.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: 'Delete successfull',
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  postContact: ctrlWrapper(postContact),
  changeContact: ctrlWrapper(changeContact),
  deleteContact: ctrlWrapper(deleteContact),
};
