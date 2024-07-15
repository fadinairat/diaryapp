import { RequestHandler, ErrorRequestHandler } from "express";  
import { writeFile } from "node:fs";
import { join } from "node:path";

export const logger : RequestHandler = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    const date = getFormattedDate();
    const result = appendToLog(date, JSON.stringify(`${new Date().toISOString()} - ${req.method} ${req.url}`))
    next();
};

function appendToLog(fileName: string, data: string): (boolean | null){
    const fs = require('fs');
    const pathToFile: string = join(__dirname, "../logs/", fileName+".log")
    const dataWithNewLine = data.endsWith('\n') ? data : data + '\n';
      
    fs.appendFile(pathToFile, dataWithNewLine, (err:Error) => {
        if (err) {
        console.error('Error appending to file:', err);
        } else {
        console.log('Data appended successfully.');
        }
    });
    return true;
}
function getFormattedDate(): string {
    const date = new Date();
    
    // Get the month, day, and year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    // Concatenate to get the desired format
    return `${month}${day}${year}`;
}
