import { model, Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    fullName: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
      minLength: 6,
    },
    profilePic: {
      type: "String",
      default: "",
    },
  },
  { timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema> & { _id: string };

export const User = model("User", userSchema);
