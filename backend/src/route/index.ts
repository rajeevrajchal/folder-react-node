import express, { Request, Response } from "express";
import fileRoute from './api/file.route';

const router = express.Router();

router.use("/api/files", fileRoute);

router.get("/", (req, res) => {
	res.send("Welcome to file system");
});

export default router;
