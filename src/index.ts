import express from 'express';
import session from 'express-session';
import postsRouter from './posts/posts';
import authRouter from './auth/auth';
import passport from 'passport';

const app = express();
app.use(
  session({
    secret: 'lsfhafsdfhadlsfpoupo7b9o762byASASDIOOASD_)(_)',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.listen(3001, () => console.log('Listening on port 3001'));
