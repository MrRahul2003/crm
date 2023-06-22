import puppeteer from "puppeteer";

import path from "path";
const __dirname = path.resolve();

import ejs from "ejs";
import nodemailer from "nodemailer";

import Enquiry from "../model/EnquiryModal.js";
import Vendor from "../model/VendorModal.js";

import dotenv from "dotenv";
dotenv.config();
const watermark = process.env.watermark;
const logo = process.env.logo;
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

const pdfgen = async (req, res) => {
  try {
    console.log(__dirname, req.body, req.body.enquiryInfo.itemList, watermark,logo);
    var itemList = req.body.enquiryInfo.itemList;

    const browser = await puppeteer.launch({
      userDataDir: "/tmp/user-data-dir",
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    const filePathName = path.join(__dirname, "/routes/views", "/genpdf.ejs");

    const html = await ejs.renderFile(filePathName, {
      itemList: itemList,
      EnquiryData: req.body.EnquiryInfo,
      watermark: watermark,
      logo: logo
    });
    await page.setContent(html);

    // create a new pdf document
    const pdf = await page.pdf({
      printBackground: true,
      path: "./pdf/enquirypdf.pdf",
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.3in",
        right: "0.3in",
        bottom: "0.3in",
        left: "0.3in",
      },
    });
    res.contentType("application/pdf");

    console.log("file created successfully");
    res.status(200).send("File created successfully");

    browser.close();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const sendMail = async (req, res) => {
  try {
    console.log("sendMail", req.body.receiver);
    const bodyMsg = "This is Enquiry.";

    const sendingVendorsEmail = await req.body.receiver.filter(function (
      elem,
      pos
    ) {
      return req.body.receiver.indexOf(elem) == pos;
    });
    console.log(sendingVendorsEmail);

    // ----------------------------------yahn pr sa changes krna ha--------------------------------
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    let details = {
      from: EMAIL,
      to: sendingVendorsEmail,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "enquirypdf.pdf", // <= Here: made sure file name match
          path: path.join(__dirname, "/pdf/enquirypdf.pdf"), // <= Here
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

// getting all notes data from database
const getPipelineEnquiry = async (req, res) => {
  try {
    console.log("getting all Enquiry data", req.body);

    const allEnquiry = await Enquiry.find({});
    return res.status(200).json(allEnquiry);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const addEnquiry = async (req, res) => {
  try {
    console.log("add enquiry", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const enquiry_contact_id = req.body.enquiry_contact_id;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const employeeExist = await Enquiry.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      enquiry_contact_id: enquiry_contact_id,
    });

    if (employeeExist) {
      console.log("employee exists");

      // if enquiry exists then we will add the s data inside the array of it
      const updateEnquiry = await Enquiry.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          enquiry_contact_id: enquiry_contact_id,
        },
        {
          $push: {
            enquiry: req.body,
          },
        }
      );
      console.log("enquiry updated successfully", updateEnquiry);

      return res.status(200).json({ message: "enquiry updated successfully" });
    } else {
      console.log("employee dont exists");
      // if enquiry field document is not found then create one and then later update it later
      const newEnquiry = new Enquiry({
        employee_id: employee_id,
        employee_email: employee_email,
        enquiry_contact_id: enquiry_contact_id,
      });
      await newEnquiry.save();
      console.log("new enquiry added successfully", newEnquiry);

      // if enquiry not exists then after creating it we will add the s inside the array of it
      const updateEnquiry = await Enquiry.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          enquiry_contact_id: enquiry_contact_id,
        },
        {
          $push: {
            enquiry: req.body,
          },
        }
      );
      console.log("enquiry added & updated successfully", updateEnquiry);

      return res
        .status(200)
        .json({ message: "enquiry added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all notes data from database
const getAllEnquiry = async (req, res) => {
  try {
    console.log("getting all Enquiry data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const enquiry_contact_id = req.body.enquiry_contact_id;

    const allEnquiry = await Enquiry.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      enquiry_contact_id: enquiry_contact_id,
    });
    return res.status(200).json(allEnquiry);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// editting a single company data from database
const editenquiry = async (req, res) => {
  try {
    console.log("edit enquiry", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const enquiry_contact_id = req.body.enquiry_contact_id;

    const enquiry_id = req.body.enquiry_id;

    const updateCompany = await Enquiry.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        enquiry_contact_id: enquiry_contact_id,
        "enquiry._id": enquiry_id,
      },
      {
        $set: {
          "enquiry.$": req.body,
        },
      }
    );

    console.log("updateCompany", updateCompany);

    return res.status(200).json({ message: "company updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// deleting a single enquiry data from database
const deleteEnquiry = async (req, res) => {
  try {
    console.log("delete Enquiry", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const enquiry_contact_id = req.body.enquiry_contact_id;

    const enquiry_id = req.body.enquiry_id;

    const deleteEnquiry = await Enquiry.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        enquiry_contact_id: enquiry_contact_id,
      },
      {
        $pull: { enquiry: { _id: enquiry_id } },
      }
    );

    console.log("deleteEnquiry", deleteEnquiry);

    return res.status(200).json({ message: "enquiry deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  addEnquiry,
  getAllEnquiry,
  deleteEnquiry,
  getPipelineEnquiry,
  editenquiry,
  sendMail,
  pdfgen,
};

// const pdfgen = async (req, res) => {
//   try {
//     console.log(__dirname, req.body, req.body.enquiryInfo.itemList);
//     var itemList = req.body.enquiryInfo.itemList;

//     if (itemList.length === 0) {
//       console.log("0", "no itemList found");
//       res.status(500).send("no itemList found");
//     } else {
//       ejs.renderFile(
//         path.join(__dirname, "/routes/views", "/genpdf.ejs"),
//         {
//           itemList: itemList,
//           EnquiryData: req.body.EnquiryInfo,
//         },
//         (err, data) => {
//           if (err) {
//             console.log("1", err);
//             res.status(500).send(err);
//           } else {
//             let options = {
//               childProcessOptions: {
//                 env: {
//                   OPENSSL_CONF: "/dev/null",
//                 },
//               },
//               "format": "A4",
//               "orientation": "portrait",
//               remarkable: {
//                 html: true
//               },
//               "border": {
//                 "top": "0.3in",
//                 "right": "0.3in",
//                 "bottom": "0.3in",
//                 "left": "0.3in"
//               },
//             };
//             pdf
//               .create(data, options)
//               .toFile("./pdf/enquirypdf.pdf", function (err, data) {
//                 if (err) {
//                   console.log("2", err);
//                   res.status(500).send(err);
//                 } else {
//                   console.log("file created successfully");
//                   res.status(200).send("File created successfully");
//                 }
//               });
//           }
//         }
//       );
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json(error.message);
//   }
// };
