import { IncomingMessage, ServerResponse } from "http";
import Segel from "./models/segel.js";

export const createRoute = (url: string, method: string) => {
  return `${method} ${url}`;
};

export const mainRoute = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello Yedidi</h1>");
  res.end();
};

export const getSegel = async (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  const dbRes = await Segel.findById("638d2818dc12733b1c06bce6");
  res.setHeader("Content-Type", "application/json"); // Status & header
  res.write(JSON.stringify(dbRes)); // build in js function, to convert json to a string
  res.end();
};

export const createSegel = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  res.statusCode = 201;

  // Check the type of this object (with TS)
  const segel = new Segel({
    name: "Nisso",
    age: 28,
    animal: "Fish",
  });

  // Mongoose automaticlly will insert this document to our collection!
  const dbRes = await segel.save();
  console.log(dbRes);

  res.setHeader("Content-Type", "application/json"); // Status & header
  res.write("Done! :)");
  res.end();
};
