const passport = require("passport");
const jwt = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UsersDao = require("../dao/users.dao");
const { PRIVATEKEY } = require("../utils/jwt.util");
require("dotenv").config();

//------------------------ DEPRECADO POR JWT ------------------------------------
const local = require("passport-local");
const cookieExtractor = require("../utils/cookieExtractor.util");
const { passwordValidate, createHash } = require("../utils/cryptPassword.util");
const LocalStrategy = local.Strategy;
// -------------------------------------------------------------------------------

const JWTStrategy = jwt.Strategy;
const Users = new UsersDao();

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
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/googlecallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await Users.findUser(profile._json.email);

          if (!user) {
            const newUserInfo = {
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              age: 18,
              email: profile._json.email,
              password: "",
            };
            const newUser = await Users.createUser(newUserInfo);
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
    const user = await Users.findUserById(id);
    done(null, user);
  });

  //------------------------ DEPRECADO POR JWT ------------------------------------
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, password } = req.body;
          const user = await Users.findUser(username);
          if (user) {
            console.log("Usuario ya existe");
            return done(null, false);
          }

          const newUserInfo = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          const newUser = await Users.createUser(newUserInfo);

          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await Users.findUser(username);
          if (!user) {
            console.log("El usuario no existe");
            return done(null, false);
          }

          if (!passwordValidate(password, user)) return done(null, false);

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
