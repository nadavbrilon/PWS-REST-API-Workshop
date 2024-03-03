
import { IncomingMessage, ServerResponse } from "http";

import Comment from "./models/comment.js";

export const createRoute = (url: string, method: string) => {
  return `${method} ${url}`;
};

export const mainRoute = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello Yedidi</h1>");
  res.write(`<ul>
      <li>Add new comment. POST /api/comment</li>
      <li>Get single comment. GET /api/comment/{id}</li>
      <li>Get multiple comments. GET /api/comment?skip={skip}&limit={limit}</li>
  </ul>`);
  res.end();
};

export const getComment = async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathArray = url.pathname.split("/");

  if (pathArray.length > 4) {
    res.statusCode = 404;
    res.end("Invalid URL");
    return;
  }

  if (pathArray.length === 4) {
    let dbRes;
    try {
      dbRes = await Comment.findById(pathArray[3]);
    }
    catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }
    if (!dbRes) {
      res.statusCode = 404;
      res.end("Comment not found");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(dbRes));
    res.end();
    return;
  }
  else { // if (pathArray.length === 3)
    let dbRes;

    /* TODO: Implement pagination with skip and limit query params */
    try {
      dbRes = await Comment.find();
    }
    /* ========== */
    catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(dbRes));
    res.end();
  }
};

export const createComment = async (
  req: IncomingMessage,
  res: ServerResponse
) => {

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    let comment;
    try {
      comment = new Comment(JSON.parse(body));
      /* TODO: Add validation for comment properties */
  
      /* ========== */
    }
    catch (err) {
      res.statusCode = 400;
      res.end("Invalid Comment");
      return;
    }


    try {
      await comment.save();
    }
    catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    res.end(JSON.stringify({ id: comment.id }));
  });
};
