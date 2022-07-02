import express from 'express';
import { getAllFiles, getFileDirectories } from '../../controllers/file.controller';

const fileRoute = express.Router();
fileRoute.get('', getAllFiles);
fileRoute.get('/directories/:source', getFileDirectories)

export default fileRoute;