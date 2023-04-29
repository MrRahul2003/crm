"use strict";

import path from "path";
const __dirname = path.resolve();

import pdf from "html-pdf";
import ejs from "ejs";
import nodemailer from "nodemailer";

// import Enquiry from "../model/EnquiryModal.js";
// import Vendor from "../model/VendorModal.js";

const purchaseordergen = async (req, res) => {
  try {
    console.log("purchase",__dirname, req.body.itemList);
    var itemList = req.body.itemList;

    if (itemList.length === 0) {
      res.status(500).send("no itemList found");
    } else {
      console.log("fhdas");
      ejs.renderFile(
        path.join(__dirname, "/routes/views", "/genpurchaseorderpdf.ejs"),
        {
          itemList: itemList,
        },
        (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            let options = {
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
              .toFile("./purchaseorderPdf/purchaseorder.pdf", function (err, data) {
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

const sendPurchaseorderMail = async (req, res) => {
  try {
    console.log("sendMail", req.body.vendorData);
    const bodyMsg = "hii kaise hoo";

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
      to: req.body.vendorData.vendor_email,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "enquiry.pdf", // <= Here: made sure file name match
          path: path.join(__dirname, "/purchaseorderPdf/purchaseorder.pdf"), // <= Here
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

export {
sendPurchaseorderMail,
purchaseordergen
};
