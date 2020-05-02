const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./models");

const passport = require("./passport/setup");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/login", {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.get("/api/oneUser", (req, res) => {
  db.User.findOne({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  })
});

//Static file declaration
// app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

// //build mode
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/public/index.html'));
// });

app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

//Route setup
// app.get('/', (req, res) => {
//   res.send('You are doing great!');
// });

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
