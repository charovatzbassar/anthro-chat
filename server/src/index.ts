import express, { Express, Request, Response } from "express";

const app: Express = express();

const port: number = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
