import { NextFunction } from "express";
import {extend} from 'lodash'

import fs from 'fs'
import path from 'path'
import os from 'os'

const mainRoot = ""
const homeDir = os.homedir(); 
const rootPath = path.join(homeDir, mainRoot)

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 7);


export const getFileDirectories = async (req: any, res: any, next: NextFunction) => {
    try {
        const { source } = req.params
        const directories = fs.readdirSync(
            (path.join(rootPath, source || "Desktop")),
            { withFileTypes: true }
        ).filter(dirent => dirent.isDirectory()).map(dirent => extend(
            {
                name: dirent.name,
                type: fs.statSync(path.join(rootPath, `${source}/${dirent.name}`)).isDirectory() ? 'directory' : 'file',
                property: fs.statSync(path.join(rootPath, `${source}/${dirent.name}`))
            }
        ))
        res.status(200).json({
            status: "success",
            directories: directories,
        });
    } catch (error) {
         console.log("the error", {
            error
        });
        next(error);
    }
}

export const getAllFiles = async (req: any, res: any, next: NextFunction) => { 
    try {
        fs.readdir(rootPath, async (err, files) => {
            if (files) {
                const readFiles: { file: any; type: string; property: fs.Stats; }[] = []
                await files.map((file: any) => {
                    const fileProperty = fs.statSync(path.join(rootPath, file));
                    const fileType = fileProperty.isDirectory() ? 'directory' : 'file'                    
                    if (fileProperty.mtime >= currentDate) { 
                        readFiles.push({
                            file: file,
                            type: fileType,
                            property: fileProperty,
                        })
                    }
                })
                res.status(200).json({
				    status: "success",
                    files: readFiles,
                });
            }
            if (err) {
                res.status(200).json({
				    status: "error",
                    message: err || "Something wend worng, cannot fetch folders"
                });
            }
        }) 
    } catch (error) {
        console.log("the error", {
            error
        });
        next(error);
    }
}