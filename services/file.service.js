import fs from "fs/promises";

async function readFromJson(path) {
    try{
      const data = await fs.readFile(path, "utf-8")
      const parseData = JSON.parse(data)
      return parseData
    }catch (err){
        console.log(err)
    }

};

async function writeToJson (path, newFileData) {
    try{
    fs.writeFile(path, JSON.stringify(newFileData, null, 2))
    }catch (err){
        console.log(err)
    }

};



export default{
    readFromJson,
    writeToJson
};

