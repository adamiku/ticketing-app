import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the properties that are required to create a new User
interface UserAttributes {
  email: string;
  password: string;
}

// an interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build: (attributes: UserAttributes) => UserDoc;
}

// an interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

// force types with typescript and mongoose
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
