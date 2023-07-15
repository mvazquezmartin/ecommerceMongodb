const passport = require("passport");
const jwt = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const usersStore = require("../store/user.store");
const cookieExtractor = require("../utils/cookieExtractor.util");
const { PRIVATEKEY } = require("./jwt.config");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
} = require("./oauthPassport.config");

//------------------------ DEPRECADO POR JWT ------------------------------------
// const local = require("passport-local");
// const { passwordValidate, createHash } = require("../utils/cryptPassword.util");
// const LocalStrategy = local.Strategy;
// -------------------------------------------------------------------------------

const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATEKEY,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {          
          const user = await usersStore.getOne(profile._json.email);

          if (!user) {
            const newUserInfo = {
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              age: 18,
              email: profile._json.email,
              password: profile._json.sub,
            };
            const newUser = await userStore.create(newUserInfo);
            return done(null, newUser);
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersStore.getOne(id);
    done(null, user);
  });
};

module.exports = initializePassport;

//------------------------ DEPRECADO POR JWT ------------------------------------
// passport.use(
//   "register",
//   new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async (req, username, password, done) => {
//       try {
//         const { first_name, last_name, email, age, password } = req.body;
//         const user = await Users.findUser(username);
//         if (user) {
//           console.log("Usuario ya existe");
//           return done(null, false);
//         }

//         const newUserInfo = {
//           first_name,
//           last_name,
//           email,
//           age,
//           password: createHash(password),
//         };

//         const newUser = await Users.createUser(newUserInfo);

//         done(null, newUser);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(
//   "login",
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (username, password, done) => {
//       try {
//         const user = await Users.findUser(username);
//         if (!user) {
//           console.log("El usuario no existe");
//           return done(null, false);
//         }

//         if (!passwordValidate(password, user)) return done(null, false);

//         done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
