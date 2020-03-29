import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';

import * as database from './database';
import config from './config';
import middlewares from './middlewares';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ threshold: 0 }));

if (!config.server.isProduction) {
  app.use(morgan('dev')); // Log requests on development.
}

app.use(middlewares.response()); // res.locals.success, res.locals.error

routes(app); // Configure all our application routes.

app.use('/public', express.static(config.directory.public)); // Configure public directory which contain photos and etc.

if (config.server.isProduction) {
  app.use(express.static(config.directory.site));

  app.get('*', (_, res) => {
    res.sendFile(config.file.siteIndex); // In case it's not API serve the website...
  });
}

database.connect().then(); // Connect to Database.

export default app;
