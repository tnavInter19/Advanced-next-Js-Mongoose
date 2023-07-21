// src/server/server.js
require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const next = require('next');

// Initialize Next.js with dev mode (set process.env.NODE_ENV to 'production' for production mode)
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Connect to your MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the Express server
nextApp.prepare().then(() => {
 const express = require('express');
 const app = express();
 
 const authenticateUser = require('./middleware/authentication');
 // routers
 const authRouter = require('./routes/auth');
 const jobsRouter = require('./routes/jobs');
 // error handler
 const notFoundMiddleware = require('./middleware/not-found');
 const errorHandlerMiddleware = require('./middleware/error-handler');
 
 app.set('trust proxy', 1);
 app.use(
   rateLimiter({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   })
 );
 
 app.use(express.json());
 // app.use(helmet());
 // app.use(cors());
 // app.use(xss());
 
 app.get('/api/docs', (req, res) => {
   res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
 });


 
 app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
 
 app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
 
 // routes
 app.use('/api/v1/auth', authRouter);
 app.use('/api/v1/jobs', authenticateUser, jobsRouter);
 
 // app.use(notFoundMiddleware);
 app.use(errorHandlerMiddleware);
 
 const port = process.env.PORT || 3000;
 // For all other routes, let Next.js handle them
 app.all('*', (req, res) => {
  return handle(req, res);
});

// Start the server on port 3000
app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server is listening on port 3000...`);
});
 
 // const start = async () => {
 //   try {
    
 //     await connectDB(process.env.MONGO_URI);
 //        // For all other routes, let Next.js handle them
 //   app.all('*', (req, res) => {
 //    return handle(req, res);
 //  });
 //     app.listen(port, () =>
 //       console.log(`Server is listening on port ${port}...`)
 //     );
 //   } catch (error) {
 //     console.log(error);
 //   }
 // };
 
 // start();

});