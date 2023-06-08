import multer from "multer";
import path from "path"; 
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("VendorBill")) {
      fs.mkdirSync("VendorBill");
    }

    if (!fs.existsSync("VendorBill/vendorbill")) {
      fs.mkdirSync("VendorBill/vendorbill");
    }

    cb(null, "VendorBill/vendorbill");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.uuid_id + file.originalname);
  },
});


const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    console.log(ext);

    if (ext !== ".pdf") {
      return cb(new Error("only pdf are allowed !"));
    }

    cb(null, true);
  },
});

export {storage, upload};
