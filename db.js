import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  user: String,
});

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  admin: String,
});

const CoursesSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  creatorId: ObjectId,
});

const PurchasesSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("users", UserSchema);
const adminModel = mongoose.model("admins", AdminSchema);
const courseModel = mongoose.model("courses", CoursesSchema);
const purchaseModel = mongoose.model("purchases", PurchasesSchema);

export { userModel, adminModel, courseModel, purchaseModel };
