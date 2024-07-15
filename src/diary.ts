import { readFileSync, writeFile } from "node:fs";
import { readFile } from "node:fs/promises";
import { DiaryType } from "./types/diarytype";
import { join } from "node:path";
import { resolve } from "dns/promises";
import { pathToFileURL } from "node:url";
import { nanoid } from 'nanoid'


export default class Diary{
    #currDate = new Date();
    constructor(){
    }

    //1. Add New Diary 
    public addDiary(title: string, description: string, rate:number) : boolean{        
        try{
            const date = this.getFormattedDate();
            
            //Fetch Today Diary and Save into List
            let diaryList = this.fetchFile(date);
            
            //Create Diary Item
            const item: DiaryType = {id: nanoid(), title, description, date: new Date(), rate: 0}

            //Save the Item to List
            if(!diaryList) diaryList = [];

            diaryList.push(item);
            //Save List to File Again
            const res = this.writeToFile(date, JSON.stringify(diaryList))

            return true;          
        }
        catch(error){
            console.error('Error fetching diaries:', error);
            return false;
        }
    }

    //2. Get Diary by ID
    public getDiary(id: string, date: string):DiaryType | null{
        //Fetch the Diary File By Date and save to List
        try{
            const conDate = date.replace(/-/g, '');
            const list = this.listDiaries(conDate)
            if(list){
                const index = list.findIndex(a=> a.id == id);
                if(index !==-1){//Item found
                    const item: DiaryType = list[index];
                    return item;
                }
                else{
                    throw new Error("No Diaries Found...");
                }
            }
            else{
                throw new Error("No list returned...");
            }            
        }
        catch(error){
            throw new Error("Internal Server Error... No Data Fetched...")
            return null;
        }
    }

    //3. List All Diaries by Date
    public listDiaries(date: string): DiaryType[] | null {        
        //Fetch the Diary File and Save the JSON
        try{
            const list = this.fetchFile(date)
            return list;
        }
        catch(error){
            console.error('Error fetching diaries:', error);
            return null;
        }
    }

    //4. Update Diary Rate
    public incrementDiaryRate(id: string, date: string):boolean{
        //Read the Diary File By Date
        const list = this.listDiaries(date);
        const conDate = date.replace(/-/g, '');
        if(list){
            //Filter to Get the Diary By ID
            const index = list.findIndex(a=> a.id == id);
            if(index !==-1){
                const item = list[index];
                //Update the Diary Rate
                item.rate = item.rate+1;
                list[index] = item;//Update the item in list
                //Write the updated list again to the file
                this.writeToFile(conDate,JSON.stringify(list));
                return true;
            }
            else{
                return false;
            }
        }
        else{
            //No List Found
            return false;
        }
        
    }

    //4. Update Diary Rate
    public decrementDiaryRate(id: string, date: string):boolean{
        //Read the Diary File By Date
        const list = this.listDiaries(date);
        const conDate = date.replace(/-/g, '');
        if(list){
            //Filter to Get the Diary By ID
            const index = list.findIndex(a=> a.id == id);
            if(index !==-1){
                const item = list[index];
                //Update the Diary Rate
                item.rate = item.rate-1;
                list[index] = item;//Update the item in list
                //Write the updated list again to the file
                this.writeToFile(conDate,JSON.stringify(list));
                return true;
            }
            else{
                return false;
            }
        }
        else{
            //No List Found
            return false;
        }
    }

    //5. Provide a method to get a formatted date, to use it whenever needed
    public getFormattedDate(): string {
        const date = new Date();
        
        // Get the month, day, and year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        
        // Concatenate to get the desired format
        return `${month}${day}${year}`;
    }

    private fetchFile(name: string): (DiaryType[] | null){        
        const pathToFile: string = join(__dirname, "../diaries/", name+".json")
        try {
            const data: string = readFileSync(pathToFile,"utf8");
            return JSON.parse(data);
        } catch (err) {
            console.log("File Created");
            writeFile(pathToFile,"[]",{ flag: 'wx' },()=>{});
            console.error('Error reading file:', err);
        }
        //Return null in case of exception 
        return null;
    }

    private writeToFile(fileName: string, data: string): (boolean | null){
        const pathToFile: string = join(__dirname, "../diaries/", fileName+".json")
        try {
            writeFile(pathToFile,data,{ flag: 'w' },()=>{});
            return true;
        } catch (err) {
            console.error('Error writing to file:', err);
            return false;
        }
    }

}