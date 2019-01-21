const LocalStrategy =  require('passport-local').Strategy;
const admins = require('./model/admins');

module.exports = (passport)=>{
    passport.use(new LocalStrategy(
        function(username, password, done) {
          admins.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password!=password) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        }
      ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        admins.findById(id, function (err, user) {
          done(err, user);
        });
      });
    
}
