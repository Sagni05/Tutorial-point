import express from "express";
import { User } from "../modal/userModal.js";
import multer from "multer";
// var upload = multer({ dest: "public/uploads/" });

const router = express.Router();

router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params);
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

// img storage path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// create user

router.post("/register", upload.single("productImage"), (req, res) => {
  var user = new User({
    postTitle: req.body.postTitle,
    category: req.body.category,
    description: req.body.description,
    image: req.file.filename,
  });

  user
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "Created Successfully",
        data: doc,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message,
      });
    });
});

// edit method

router.put("/edit/:_id", upload.single("productImage"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params,
      {
        postTitle: req.body.postTitle,
        category: req.body.category,
        description: req.body.description,
        image: req.file.filename,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      Message: "Update Successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

//delete one user

router.delete("/delete/:_id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params, {
      new: true,
    });
    res.status(201).json({
      message: "Delete Successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

export default router;
