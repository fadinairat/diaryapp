"use strict";
var _Diary_currDate;
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const nanoid_1 = require("nanoid");
class Diary {
    constructor() {
        _Diary_currDate.set(this, new Date());
    }
    //1. Add New Diary 
    addDiary(title, description, rate) {
        try {
            const date = this.getFormattedDate();
            //Fetch Today Diary and Save into List
            let diaryList = this.fetchFile(date);
            //Create Diary Item
            const item = { id: (0, nanoid_1.nanoid)(), title, description, date: new Date(), rate: 0 };
            //Save the Item to List
            if (!diaryList)
                diaryList = [];
            diaryList.push(item);
            //Save List to File Again
            const res = this.writeToFile(date, JSON.stringify(diaryList));
            return true;
        }
        catch (error) {
            console.error('Error fetching diaries:', error);
            return false;
        }
    }
    //2. Get Diary by ID
    getDiary(id, date) {
        //Fetch the Diary File By Date and save to List
        try {
            const conDate = date.replace(/-/g, '');
            const list = this.listDiaries(conDate);
            if (list) {
                const index = list.findIndex(a => a.id == id);
                if (index !== -1) { //Item found
                    const item = list[index];
                    return item;
                }
                else {
                    throw new Error("No Diaries Found...");
                }
            }
            else {
                throw new Error("No list returned...");
            }
        }
        catch (error) {
            throw new Error("Internal Server Error... No Data Fetched...");
            return null;
        }
    }
    //3. List All Diaries by Date
    listDiaries(date) {
        //Fetch the Diary File and Save the JSON
        try {
            const list = this.fetchFile(date);
            return list;
        }
        catch (error) {
            console.error('Error fetching diaries:', error);
            return null;
        }
    }
    //4. Update Diary Rate
    incrementDiaryRate(id, date) {
        //Read the Diary File By Date
        const list = this.listDiaries(date);
        const conDate = date.replace(/-/g, '');
        if (list) {
            //Filter to Get the Diary By ID
            const index = list.findIndex(a => a.id == id);
            if (index !== -1) {
                const item = list[index];
                //Update the Diary Rate
                item.rate = item.rate + 1;
                list[index] = item; //Update the item in list
                //Write the updated list again to the file
                this.writeToFile(conDate, JSON.stringify(list));
                return true;
            }
            else {
                return false;
            }
        }
        else {
            //No List Found
            return false;
        }
    }
    //4. Update Diary Rate
    decrementDiaryRate(id, date) {
        //Read the Diary File By Date
        const list = this.listDiaries(date);
        const conDate = date.replace(/-/g, '');
        if (list) {
            //Filter to Get the Diary By ID
            const index = list.findIndex(a => a.id == id);
            if (index !== -1) {
                const item = list[index];
                //Update the Diary Rate
                item.rate = item.rate - 1;
                list[index] = item; //Update the item in list
                //Write the updated list again to the file
                this.writeToFile(conDate, JSON.stringify(list));
                return true;
            }
            else {
                return false;
            }
        }
        else {
            //No List Found
            return false;
        }
    }
    //5. Provide a method to get a formatted date, to use it whenever needed
    getFormattedDate() {
        const date = new Date();
        // Get the month, day, and year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        // Concatenate to get the desired format
        return `${month}${day}${year}`;
    }
    fetchFile(name) {
        const pathToFile = (0, node_path_1.join)(__dirname, "../diaries/", name + ".json");
        try {
            const data = (0, node_fs_1.readFileSync)(pathToFile, "utf8");
            return JSON.parse(data);
        }
        catch (err) {
            console.log("File Created");
            (0, node_fs_1.writeFile)(pathToFile, "[]", { flag: 'wx' }, () => { });
            console.error('Error reading file:', err);
        }
        //Return null in case of exception 
        return null;
    }
    writeToFile(fileName, data) {
        const pathToFile = (0, node_path_1.join)(__dirname, "../diaries/", fileName + ".json");
        try {
            (0, node_fs_1.writeFile)(pathToFile, data, { flag: 'w' }, () => { });
            return true;
        }
        catch (err) {
            console.error('Error writing to file:', err);
            return false;
        }
    }
}
_Diary_currDate = new WeakMap();
exports.default = Diary;
