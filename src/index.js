import express from 'express';
import morgan from 'morgan';
import path from 'path';
import {engine} from 'express-handlebars';
import {fileURLToPath} from 'url';
import {router} from './router/index.js';
import db from './app/model/index.js';
import methodOverride from 'method-override';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  engine({
      extname: '.hbs',
      helpers: {
          sum: (a, b) => a + b,
      },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'view'));

// Routes init
router(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
