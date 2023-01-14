import mongoose from "mongoose";

const userModal = mongoose.Schema({
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postTitle: {
    type: String,
    required: [true, "PostTitle is required"],
  },
  category: {
    type: String,
    required: [true, "Category  is required"],
  },
  description: {
    type: String,
    required: [true, "Description  is required"],
  },
});
// userModal.plugin(mongoosePaginate);

const User = mongoose.model("User", userModal);

export { User };
