import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', runValidateAtUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `'name' must be exist`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required().messages({
    'any.required': `'number' must be exist`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field favorite`,
  }),
});

const Contact = model('contact', contactSchema);

export default Contact;
