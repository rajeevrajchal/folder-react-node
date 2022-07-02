import express from "express";
import http from "http";
import cors from "cors";

import router from "./src/route";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});

export default app;