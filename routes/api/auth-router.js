import express from 'express';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import authController from '../../controllers/auth-controller.js';
import { authenticate } from '../../middlewares/index.js';

const authRouter = express.Router();

const userSignUpValidate = validateBody(userSchemas.userSignUpSchema);

const userSignInValidate = validateBody(userSchemas.userSignInSchema);

const userEmailValidate = validateBody(userSchemas.userEmailSchema);

authRouter.post('/signup', userSignUpValidate, authController.signup);

authRouter.get('/verify/:verificationCode', authController.verify);

authRouter.post('/verify', userEmailValidate, authController.resendVerifyEmail);

authRouter.post('/signin', userSignInValidate, authController.signin);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/signout', authenticate, authController.signout);

export default authRouter;
