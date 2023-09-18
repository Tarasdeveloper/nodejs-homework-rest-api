import express from 'express';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import authController from '../../controllers/auth-controller.js';
import { authenticate } from '../../middlewares/index.js';

const authRouter = express.Router();

const userSignUpValidate = validateBody(userSchemas.userSignUpSchema);

const userSignInValidate = validateBody(userSchemas.userSignInSchema);

authRouter.post('/signup', userSignUpValidate, authController.signup);

authRouter.post('/signin', userSignInValidate, authController.signin);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/signout', authenticate, authController.signout);

export default authRouter;
