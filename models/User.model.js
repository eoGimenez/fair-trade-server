const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    surname: {
      type: String,
      required: [true, "Surname is required."]
    },
    commercename: {
      type: String,
      required: true
    },
    role: {
      enum:["Artisan", "Commerce", "Admin"]
    },
    cif: {
      type: String,
      required: true,
      unique: true
    },
    avatar: String,
    aboutme: String,
    location: String,
    posts:[ {type: Schema.Types.ObjectId, ref:"Post" }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
