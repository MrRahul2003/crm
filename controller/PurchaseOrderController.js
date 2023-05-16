"use strict";

import path from "path";
const __dirname = path.resolve();

import pdf from "html-pdf";
import ejs from "ejs";
import nodemailer from "nodemailer";

import PurchaseOrder from "../model/PurchaseOrderModal.js";

const purchaseordergen = async (req, res) => {
  try {
    console.log("purchase", __dirname, req.body);
    var itemList = req.body.itemList;
    var total_cost = 0;

    itemList.forEach(element => {
      total_cost = parseInt(total_cost) + parseInt(element.item_total_price);     
      console.log(total_cost+"\n");
    });

    if (itemList.length === 0) {
      res.status(500).send("no itemList found");
    } else {
      console.log("fhdas");
      var logoSrc = path.join('file://', __dirname, '/img/logo.jpeg');
      console.log(logoSrc);
      ejs.renderFile(
        path.join(__dirname, "/routes/views", "/genpurchaseorderpdf.ejs"),
        {
          itemList: itemList,
          vendorData: req.body.vendorData,
          refno: req.body.uuid_id,
          logo: logoSrc,
          total_cost: total_cost,
          vendor_name: req.body.vendor_name,
          vendor_email: req.body.vendor_email,
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
                "top": "0.5in",         
                "right": "0.7in",
                "bottom": "1.5in",
                "left": "0.7in"
              },
              paginationOffset: 1,
              "header": {
                "height": "10mm",
                // "contents": '<h2 style="text-align: center;">AEGIS PROJECTS TECHNOLOGY PVT. LTD</h2>'
              },
              "footer": {
                "height": "10mm",
                "contents": 
                `<hr/> <small style="text-align: justify; color: blue">
                Office: Office No 01, Swami Samarth Building, Opp. Sangrila Biscuits Company, Next to Kala Udyog, 
                LBS MARG, Bhandup (west), Mumbai – 400078, Maharashtra (INDIA) <br/>
                Tel: 022 25663611 | 022 25663612 Fax: 022 25663613 <br/>
                Email: projects@aegisptech.com, &nbsp;
                Website: www.aegisptech.com <br/>
                </small>`
              }
            };
            pdf
              .create(data, options)
              .toFile(
                "./pdf/purchaseorderpdf.pdf",
                function (err, data) {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    console.log("file created successfully");
                    res.status(200).send("File created successfully");
                  }
                }
              );
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
          path: path.join(__dirname, "/pdf/purchaseorderpdf.pdf"), // <= Here
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

const addPurchaseOrder = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addPurchaseOrder", req.body);

    const newPurchaseOrder = new PurchaseOrder(req.body);
    await newPurchaseOrder.save();

    return res.status(200).json(newPurchaseOrder);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getAllPurchaseOrder = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allPurchaseOrder = await PurchaseOrder.find({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allPurchaseOrder);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  sendPurchaseorderMail,
  purchaseordergen,
  addPurchaseOrder,
  getAllPurchaseOrder,
};
