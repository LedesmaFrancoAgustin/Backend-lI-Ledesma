import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';

const initializePassport = () => {
  passport.use(
    'current',
    new CustomStrategy((req, done) => {
      try {
        if (req.session && req.session.user) {
          return done(null, req.session.user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    })
  );
};

export default initializePassport;
