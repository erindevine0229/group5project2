const express = require("express");
const path = require("path");
const session = require("express-session");
const SequilizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require('express-handlebars');

const routes = require("./controllers");
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
  },
  resave: false,
  saveUninitialized: true,
  store: new SequilizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({}); //can be used for helper file

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening");
  });
});
