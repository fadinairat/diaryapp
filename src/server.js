"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const controller_1 = require("./controller");
////////////////  Create application  ///////////////
const application = (0, express_1.default)();
var cors = require('cors');
application.use(cors());
////////////////app configuration ///////////////
application.set('x-powered-by', true);
////////////  middleware  ////////////////
application.use(express_1.default.json());
application.use((0, express_1.urlencoded)({ extended: true })); //Parse Url-Encoded body
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
application.get("/Diaries/:date", controller_1.listDiaries);
application.get("/Diaries/GetDiary/:id/:date", controller_1.getDiary);
application.post("/Diaries", controller_1.addDiary);
application.put("/Diaries/IncRate/:id/:date", controller_1.incrementRate);
application.put("/Diaries/DecRate/:id/:date", controller_1.decrementRate);
///////////////   error handlers  /////////////////
// Catch all undefined routes
application.use((req, res, next) => {
    res.status(404).send('Sorry, the route you are looking for does not exist.');
});
// Handle Internal Server Errors (Exceptions)
application.use(controller_1.errorHandler);
///////////////    bootstrap   //////////////
application.listen(80, () => console.log("this server listenining"));
