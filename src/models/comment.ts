import * as mongoose from "mongoose";

// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

// Creating new Schema object
// Each propery have type filed - https://mongoosejs.com/docs/schematypes.html
// And requierd files if needed
const commentSchema = new mongoose.Schema
(
    {
        eventId: { type: String, required: true, min: 1 },
        author: { type: String, required: true, min: 1},
        content: { type: String, required: true, min: 1 },
        createdAt: {
            type: String,
            required: true,
            match: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, // regex pattern for YYYY-MM-DDTHH:MM format
            message: 'Invalid date format'
        }
    }
);
// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB database.
// https://mongoosejs.com/docs/models.html
export default mongoose.model("Comment", commentSchema);
