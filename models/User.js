import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscripList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscripList,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    //  owner: {
    //    type: Schema.Types.ObjectId,
    //    ref: 'user',
    //    required: true,
    //  },
  },
  { versionKey: false, timestamps: false }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidateAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

export const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscripList),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model('user', userSchema);

export default User;
