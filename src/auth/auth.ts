import express, { RequestHandler } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { verifyUserAndSelect, User as UserModel, createNewUser } from '../db';
import { createNewUserRequestSchema } from './dto';

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

passport.use(
  new Strategy({ usernameField: 'email' }, (email, password, done) => {
    verifyUserAndSelect(email, password)
      .then((user) => done(null, user))
      .catch((e) => done(e));
  })
);
passport.serializeUser((user, cb) =>
  process.nextTick(() => cb(null, { id: user.id, email: user.email, name: user.name }))
);

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user as UserModel);
  });
});

const router = express.Router();
export default router;

export const ensureAuth: RequestHandler = (req, res, next) => {
  if (!req.user) res.send(403);
  else next();
};

router.get('/me', ensureAuth, (req, res) => {
  res.json(req.user);
});

router.post(
  '/login',
  passport.authenticate('local', {
    failWithError: true,
  }),
  (req, res) => res.json(req.user)
);

router.post('/logout', function (req, res) {
  req.logout();
  res.status(204).send();
});

router.post('/signup', async (req, res) => {
  if (!req.header('content-type')) {
    res.status(415).json({ error: ['Server accepts only json payload'] });
  }

  try {
    const newUserDTO = await createNewUserRequestSchema.validate(req.body);
    const newUser = await createNewUser(newUserDTO);
    req.login(newUser, () => {
      res.json(newUser);
    });
  } catch (e) {
    res.status(400).json({ error: (e as any)?.errors ?? e });
  }
});
