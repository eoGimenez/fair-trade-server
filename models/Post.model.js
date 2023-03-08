const { Schema, model} = require("mongoose");

const postSchema = new Schema (
    {
        contract:{ 
            type: String,
            required: true    
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        bach: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category:{
            enum: ["Natural Cosmetics", "Home Deco", "Misellaneous", "Fabric & Fashion" ],
            required: true
        },
        available: {
            type: Boolean,
            required: true
        }
    },
        {
        timestamps: true,
    }
);

const Post = model("Post", postSchema);

module.exports = Post;