import fs from 'fs'
import path from 'path'
import os from 'os'

const mainRoot = ""
const homeDir = os.homedir(); 
const rootPath = path.join(homeDir, mainRoot)

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 7);

console.log('rootPath', {
    rootPath,
    currentDate
});


export const readAllFiles = async () => {
    var readFiles: any = []
    const fsFiles = fs.readdir(rootPath, (err, files) => {
        return files
    }) 
    console.log('readFiles', {
        readFiles,
        fsFiles
    })
    return readFiles
}