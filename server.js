const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("./models");

const passport = require("./passport/setup");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();
// const connection = "mongodb+srv://new-user_502:xleK9k2U4qmQqCvC@cluster0-fqadw.mongodb.net/login?retryWrites=true&w=majority";

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

// mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(() => console.log("Database Connected Successfully"))
//   .catch(err => console.log(err));

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

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
