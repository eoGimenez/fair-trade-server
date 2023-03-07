const { Schema, model} = require("mongoose");

const postSchema = new Schema (
    {
        contract:{ 
            type: String,
            require: true    
        },
        image: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        bach: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        category:{
            enum: ["Natural Cosmetics", "Home Deco", "Misellaneous", "Fabric & Fashion" ],
            require: true
        },
        available: {
            type: Boolean,
            require: true
        }
    },
        {
        timestamps: true,
    }
);

const Post = model("Post", postSchema);

module.exports = Post;