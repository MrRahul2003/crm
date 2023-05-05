import Product from "../model/ProductModal.js";

// "use strict";

import path from "path";
const __dirname = path.resolve();

import pdf from "html-pdf";
import ejs from "ejs";
import nodemailer from "nodemailer";

const pdfgenProduct = async (req, res) => {
  try {
    console.log(__dirname, req.body);
    var itemList = req.body.itemList;

    if (itemList.length === 0) {
      res.status(500).send("no itemList found");
    } else {
      ejs.renderFile(
        path.join(__dirname, "/routes/views", "/genpdfProduct.ejs"),
        {
          itemList: itemList,
        },
        (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            let options = {
              childProcessOptions: {
                env: {
                  OPENSSL_CONF: "/dev/null",
                },
              },
              height: "11.25in",
              width: "8.5in",
              header: {
                height: "20mm",
              },
              footer: {
                height: "20mm",
              },
            };
            pdf
              .create(data, options)
              .toFile("./productPdf/product.pdf", function (err, data) {
                if (err) {
                  res.status(500).send(err);
                } else {
                  console.log("file created successfully");
                  res.status(200).send("File created successfully");
                }
              });
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const sendMailProduct = async (req, res) => {
  try {
    console.log("sendMail", req.body.contactDetails);
    const bodyMsg = "hii kaise hoo";

    // ----------------------------------yahn pr sa changes krna ha--------------------------------
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "rahulsdas2003@gmail.com",
        pass: "kpnxfdblugphoexy"
      },
    });

    let details = {
      from: "rahulsdas2003@gmail.com",
      to: req.body.contactDetails.contact_email,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "product.pdf", // <= Here: made sure file name match
          path: path.join(__dirname, "/productPdf/product.pdf"), // <= Here
          contentType: "application/pdf",
        },
      ],
    };
    let info = await transporter.sendMail(details);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return res.status(200).json(info);
    // ----------------------------------yahn tak changes krna ha--------------------------------

    // -----------------------------------mail sendor---------------------------------
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allProduct = await Product.find({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const allProduct = await Product.find({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: product_id,
    });
    return res.status(200).json(allProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addproduct", req.body);

    const newProduct = new Product(req.body);
    await newProduct.save();

    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    console.log("editProduct", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const updatedProduct = await Product.updateOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: product_id,
    }, req.body);

    console.log("Product updated", updatedProduct);
    return res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log("deleteProduct", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const deletedProduct = await Product.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: product_id,
    });
    console.log("product deleted", deletedProduct);
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { getAllProduct, getProduct, addProduct, deleteProduct, editProduct, pdfgenProduct, sendMailProduct };
