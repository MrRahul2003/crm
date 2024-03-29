import puppeteer from "puppeteer";

import path from "path";
const __dirname = path.resolve();

import ejs from "ejs";
import nodemailer from "nodemailer";

import PurchaseOrder from "../model/PurchaseOrderModal.js";
import VendorBill from "../model/VendorBill.js";

import dotenv from "dotenv";
dotenv.config();
const watermark = process.env.watermark;
const logo = process.env.logo;
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

const purchaseordergen = async (req, res) => {
  try {
    console.log("purchase", __dirname, req.body);
    var itemList = req.body.itemList;
    var total_cost = 0;
    var final_total = 0;
    var GstValueCalc = 0;
    var GstValueCalcFinal = 0;

    var Freight = req.body.Freight;
    var Packaging = req.body.Packaging;

    var GstTypeInfo = req.body.GstTypeInfo;
    var GstValue = req.body.GstValue;

    var refno = req.body.uuid_id;

    itemList.forEach((element) => {
      total_cost =
        parseFloat(total_cost) + parseFloat(element.item_total_price);
    });

    if (GstTypeInfo === "IGST") {
      GstValueCalc = GstValue / 100;
      if (GstValueCalc === 0) {
        GstValueCalc = 0.01;
        console.log("0 gst", GstValueCalc);
      }
    } else {
      GstValueCalc = (GstValue * 2) / 100;
      if (GstValueCalc === 0) {
        GstValueCalc = 0.01;
        console.log("0 gst", GstValueCalc);
      }
    }

    GstValueCalcFinal =
      (parseFloat(total_cost) + parseFloat(Freight) + parseFloat(Packaging)) *
      parseFloat(GstValueCalc);

    final_total =
      parseFloat(total_cost) +
      parseFloat(Freight) +
      parseFloat(Packaging) +
      parseFloat(GstValueCalcFinal);

    console.log(
      GstValue,
      total_cost,
      Freight,
      Packaging,
      GstValueCalc,
      GstValueCalcFinal,
      final_total
    );

    if (itemList.length === 0) {
      res.status(500).send("no itemList found");
    } else {
      const browser = await puppeteer.launch({
        userDataDir: "/tmp/user-data-dir",
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();

      const filePathName = path.join(
        __dirname,
        "/routes/views",
        "/genpurchaseorderpdf.ejs"
      );
      console.log(logo);

      const html = await ejs.renderFile(filePathName, {
        itemList: itemList,
        item_make: itemList[0].item_make,
        vendorData: req.body.vendorData,
        refno: refno,

        vendor_name: req.body.vendorData.vendor_name,
        vendor_email: req.body.vendorData.vendor_email,
        vendor_company_name: req.body.vendorData.vendor_company_name,

        GstTypeInfo: GstTypeInfo,
        GstValue: GstValue,
        Freight: Freight,
        Packaging: Packaging,

        total_cost: total_cost,
        final_total: final_total,
        GstValueCalc: GstValueCalc * 100,
        GstValueCalcFinal: GstValueCalcFinal,

        watermark: watermark,
        logo: logo,
      });
      await page.setContent(html);

      // create a new pdf document
      const pdf = await page.pdf({
        path: "./pdf/purchaseorderpdf.pdf",
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
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const sendPurchaseorderMail = async (req, res) => {
  try {
    console.log("sendMail", req.body.vendorData);
    const bodyMsg = "This is Purchase Order";

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
      to: req.body.vendorData.vendor_email,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "purchaseorderpdf.pdf", // <= Here: made sure file name match
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

const addVendorBill = async (req, res) => {
  try {
    console.log("addVendorBill", req.body.employee_email, req.file);

    const resume = req.file === undefined ? "" : req.file.filename;
    console.log(resume);

    const data = {
      employee_id: req.body.employee_id,
      employee_email: req.body.employee_email,

      uuid_id: req.body.uuid_id,
      quotation_id: req.body.quotation_id,
      enquiry_id: req.body.enquiry_id,
      vendor_id: req.body.vendor_id,
      vendorbill_addingdate: req.body.vendorbill_addingdate,
      billName: req.file.filename,
    };

    const newVendorBill = new VendorBill(data);
    await newVendorBill.save();

    return res.status(200).json(newVendorBill);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getVendorBill = async (req, res) => {
  try {
    console.log(req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const quotation_id = req.body.quotation_id;

    const bill = await VendorBill.find({
      employee_id: employee_id,
      employee_email: employee_email,
      quotation_id: quotation_id,
    });
    return res.status(200).json(bill);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const downloadVendorBill = async (req, res) => {
  try {
    console.log("download bill", req.body);
    var filename = req.body.billName;
    var billPath = path.join(__dirname, "/VendorBill/vendorbill/", filename);
    console.log("file", filename, billPath);

    return res.status(200).download(billPath);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  sendPurchaseorderMail,
  purchaseordergen,
  addPurchaseOrder,
  getAllPurchaseOrder,
  addVendorBill,
  getVendorBill,
  downloadVendorBill,
};
