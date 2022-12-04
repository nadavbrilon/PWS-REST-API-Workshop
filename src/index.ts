import { createServer, IncomingMessage, ServerResponse } from "http";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
// import with .js, and not ts.
// for more info: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#type-in-package-json-and-new-extensions
import { createRoute, createSegel, getSegel, mainRoute } from "./routes.js";
import { GET_SEGEL, POST_SEGEL } from "./const.js";

// For environment-variables
dotenv.config();

const port = process.env.PORT || 3000;

// Connect to mongoDB
const dbURI = `mongodb+srv://wsp:${process.env.DBPASS}@cluster0.fn26nur.mongodb.net/?retryWrites=true&w=majority`;
await mongoose.connect(dbURI);

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const route = createRoute(req.url, req.method);

  switch (route) {
    case GET_SEGEL:
      getSegel(req, res);
      break;
    case POST_SEGEL:
      createSegel(req, res);
      break;
    default:
      mainRoute(req, res);
      break;
  }
});

server.listen(port);
console.log(`Server running! port ${port}`);
