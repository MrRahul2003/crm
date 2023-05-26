// "use strict";

import path from "path";
const __dirname = path.resolve();

import pdf from "html-pdf";
import ejs from "ejs";
import nodemailer from "nodemailer";
import ProductOrder from "../model/ProductOrderModal.js";

const pdfgenProduct = async (req, res) => {
  try {
    console.log(__dirname, req.body);
    var itemList = req.body.itemList;
    var total_cost = 0;

    itemList.forEach(element => {
      total_cost = parseInt(total_cost) + parseInt(element.item_total_price);     
      console.log(total_cost+"\n");
    });

    if (itemList.length === 0) {
      res.status(500).send("no itemList found");
    } else {
      var logoSrc = path.join('file://', __dirname, '/img/logo.jpeg');
      console.log(logoSrc);
      ejs.renderFile(
        path.join(__dirname, "/routes/views", "/genpdfProduct.ejs"),
        {
          itemList: itemList,
          contactData: req.body.contactDetails,
          refno: req.body.uuid_id,
          logo: logoSrc,
          total_cost: total_cost,
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
              "format": "A4",        
              "orientation": "portrait",
              remarkable: {
                html: true
              },              
              "border": {
                "top": "0.3in",         
                "right": "0.3in",
                "bottom": "0.3in",
                "left": "0.3in",
              },
            };
            pdf
              .create(data, options)
              .toFile("./pdf/productpdf.pdf", function (err, data) {
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
    const bodyMsg = "This is Quotation for customer";

    // ----------------------------------yahn pr sa changes krna ha--------------------------------
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "rahulsdas2003@gmail.com",
        pass: "kpnxfdblugphoexy",
      },
    });

    let details = {
      from: "rahulsdas2003@gmail.com",
      to: req.body.contactDetails.contact_email,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "productpdf.pdf", // <= Here: made sure file name match
          path: path.join(__dirname, "/pdf/productpdf.pdf"), // <= Here
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

const addProductOrder = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addProductOrder", req.body);

    const newProductOrder = new ProductOrder(req.body);
    await newProductOrder.save();

    return res.status(200).json(newProductOrder);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getAllProductOrder = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allProductOrder = await ProductOrder.find({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allProductOrder);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getEnquiryProductOrder = async (req, res) => {
  try {

    console.log("products data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const enquiry_id = req.body.enquiry_id;

    const allProductOrder = await ProductOrder.find({
      employee_id: employee_id,
      employee_email: employee_email,
      enquiry_id: enquiry_id,
    });
    return res.status(200).json(allProductOrder);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { pdfgenProduct, sendMailProduct, addProductOrder, getAllProductOrder, getEnquiryProductOrder };
