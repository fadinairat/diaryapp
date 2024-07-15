import express,{json, urlencoded, ErrorRequestHandler, RequestHandler} from 'express';
import { addDiary, listDiaries, incrementRate, decrementRate, getDiary, errorHandler } from './controller';

////////////////  Create application  ///////////////
const application = express();
var cors = require('cors')
application.use(cors())

////////////////app configuration ///////////////
application.set('x-powered-by',true);

////////////  middleware  ////////////////
application.use(express.json());
application.use(urlencoded({ extended: true })); //Parse Url-Encoded body

// Example route that intentionally throws an error
// ******* To be Deleted *********//
application.get('/error', (req, res, next) => {
    // Simulate an internal error
    throw new Error('This is an intentional error by Fadi.');
});

// Log incoming requests for debugging
application.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log('Request Params:', req.params.num);
    next();
});

//////////////////   Routers  ////////////////////
application.get("/Diaries/:date", listDiaries);
application.get("/Diaries/GetDiary/:id/:date", getDiary);
application.post("/Diaries", addDiary);
application.put("/Diaries/IncRate/:id/:date", incrementRate);
application.put("/Diaries/DecRate/:id/:date", decrementRate);

///////////////   error handlers  /////////////////
// Catch all undefined routes
application.use((req, res, next) => {
    res.status(404).send('Sorry, the route you are looking for does not exist.');
});

// Handle Internal Server Errors (Exceptions)
application.use(errorHandler);


///////////////    bootstrap   //////////////
application.listen(8080,()=>console.log("this server listenining"));
