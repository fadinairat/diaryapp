"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.decrementRate = exports.incrementRate = exports.getDiary = exports.listDiaries = exports.addDiary = void 0;
const diary_1 = __importDefault(require("./diary"));
//1. Add New Diary 
const addDiary = (req, res, next) => {
    const result = true;
    const diary = new diary_1.default();
    if (req.body) {
        const { title, description } = req.body;
        if (title) {
            diary.addDiary(title, description, 0);
            res.json({ result });
        }
        else
            res.status(500).send("Empty body!");
    }
    else
        res.status(500).send("Empty body!");
};
exports.addDiary = addDiary;
//2. List Diaries by Day
const listDiaries = (req, res, next) => {
    const diary = new diary_1.default();
    const date = req.params.date;
    try {
        if (date) {
            const conDate = date.replace(/-/g, '');
            res.json({ result: true, diaries: diary.listDiaries(conDate) });
        }
        else {
            throw new Error("Empty Date!");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.listDiaries = listDiaries;
//3. Get Diary Details By ID
const getDiary = (req, res, next) => {
    //const diary = null;
    const diary = new diary_1.default();
    const date = req.params.date;
    const id = req.params.id;
    try {
        if (date) {
            const item = diary.getDiary(id, date);
            res.json({ result: true, diary: item });
        }
        else {
            throw new Error("Empty Date!");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getDiary = getDiary;
//4. Increate Rate Diary 
const incrementRate = (req, res, next) => {
    const diary = new diary_1.default();
    const date = req.params.date;
    const id = req.params.id;
    try {
        if (date && id) {
            diary.incrementDiaryRate(id, date);
            res.send({ result: true });
        }
        else {
            throw new Error("Empty Date!");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.incrementRate = incrementRate;
//5. Decrement Rate Diary 
const decrementRate = (req, res, next) => {
    const diary = new diary_1.default();
    const date = req.params.date;
    const id = req.params.id;
    try {
        if (date && id) {
            diary.decrementDiaryRate(id, date);
            res.send({ result: true });
        }
        else {
            throw new Error("Empty Date!");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.decrementRate = decrementRate;
//6. Error Handler
const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Sorry: Internal Server Error... Contact the Web Administrator.");
};
exports.errorHandler = errorHandler;
