import { RequestHandler, ErrorRequestHandler } from "express";  
import { createReadStream} from 'node:fs';
import { join} from 'node:path';
import Diary from "./diary";
import { DiaryType } from "./types/diarytype";

//1. Add New Diary 
export const addDiary : RequestHandler = (req,res,next)=>{
   const result = true;
   const diary = new Diary();
   if(req.body){
      const {title, description} = req.body;      
      if(title){
         diary.addDiary(title, description,0)
         res.json({result})
      }
      else res.status(500).send("Empty body!");
   }
   else res.status(500).send("Empty body!");
}

//2. List Diaries by Day
export const listDiaries: RequestHandler = (req,res,next)=>{
   const diary = new Diary();
   const date:string = req.params.date;
   try{
      if(date){
         const conDate = date.replace(/-/g, '');
         res.json({result: true, diaries: diary.listDiaries(conDate)})
      }
      else{
         throw new Error("Empty Date!");
      }
   }
   catch(error){
      res.status(500).send(error);
   }
}

//3. Get Diary Details By ID
export const getDiary: RequestHandler = (req,res,next) =>{
   //const diary = null;
   const diary = new Diary();
   const date:string = req.params.date;
   const id: string = req.params.id;
   try{
      if(date){
         const item = diary.getDiary(id, date);
         res.json({result: true, diary: item});
      }
      else{
         throw new Error("Empty Date!");
      }
   }
   catch(error){
      res.status(500).send(error);
   }
}

//4. Increate Rate Diary 
export const incrementRate: RequestHandler = (req,res,next)=>{
   const diary = new Diary();
   const date:string = req.params.date;
   const id: string = req.params.id;
   try{
      if(date && id){
         diary.incrementDiaryRate(id, date);
         res.send({result: true})
      }
      else{
         throw new Error("Empty Date!");
      }
   }
   catch(error){
      res.status(500).send(error);
   }
}

//5. Decrement Rate Diary 
export const decrementRate: RequestHandler = (req,res,next)=>{
   const diary = new Diary();
   const date:string = req.params.date;
   const id: string = req.params.id;
   try{
      if(date && id){
         diary.decrementDiaryRate(id, date);
         res.send({result: true})
      }
      else{
         throw new Error("Empty Date!");
      }
   }
   catch(error){
      res.status(500).send(error);
   }
}

//6. Error Handler
export const errorHandler: ErrorRequestHandler = (err:Error, req, res, next)=>{
   console.log(err.stack);
   res.status(500).send("Sorry: Internal Server Error... Contact the Web Administrator.");
}