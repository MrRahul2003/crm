import puppeteer from "puppeteer";

import path from "path";
const __dirname = path.resolve();

import ejs from "ejs";
import nodemailer from "nodemailer";
import ProductOrder from "../model/ProductOrderModal.js";

import dotenv from "dotenv";
import TaxInvoice from "../model/TaxInvoice.js";
dotenv.config();
const watermark = process.env.watermark;
const logo = process.env.logo;
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

const pdfgenProduct = async (req, res) => {
  try {
    console.log(__dirname, req.body);
    var itemList = req.body.itemList;
    var total_cost = 0;

    itemList.forEach((element) => {
      total_cost = parseInt(total_cost) + parseInt(element.item_total_price);
      console.log(total_cost + "\n");
    });

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
        "/genpdfProduct.ejs"
      );
      console.log(logo);
      const html = await ejs.renderFile(filePathName, {
        itemList: itemList,
        contactData: req.body.contactDetails,
        contact_name: req.body.contactDetails.contact_name.toUpperCase(),

        refno: req.body.uuid_id,
        total_cost: total_cost,

        packing_charge: req.body.packing_charge,
        transport_charge: req.body.transport_charge,
        payment_terms: req.body.payment_terms,
        delivery: req.body.delivery,
        offer_validity: req.body.offer_validity,
        GstTypeInfo: req.body.GstTypeInfo,
        gst_value: req.body.gst_value,
        enquiry_addingdate: req.body.enquiry_addingdate,

        watermark: watermark,
        logo: logo,
      });
      await page.setContent(html);

      // create a new pdf document
      const pdf = await page.pdf({
        printBackground: true,
        path: "./pdf/productpdf.pdf",
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
        user: EMAIL,
        pass: PASS,
      },
    });

    let details = {
      from: EMAIL,
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

const addTaxInvoice = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addTaxInvoice", req.body);

    const newTaxInvoice = new TaxInvoice(req.body);
    await newTaxInvoice.save();

    return res.status(200).json(newTaxInvoice);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getTaxInvoice = async (req, res) => {
  try {
    console.log("taxinvoice", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const quotation_id = req.body.quotation_id;

    const allProductOrder = await TaxInvoice.find({
      employee_id: employee_id,
      employee_email: employee_email,
      quotation_id: quotation_id,
    });
    console.log(addProductOrder);
    return res.status(200).json(allProductOrder);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteTaxInvoice = async (req, res) => {
  try {
    console.log("deleteTaxInvoice", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const quotation_id = req.body.quotation_id;
    const taxinvoice_id = req.body.taxinvoice_id;

    const deleteTaxInvoice = await TaxInvoice.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,
      quotation_id: quotation_id,
      _id: taxinvoice_id,
    });
    console.log("TaxInvoice deleted", deleteTaxInvoice);
    return res.status(200).json({ message: "TaxInvoice deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const pdfgenTaxInvoice = async (req, res) => {
  try {
    var itemList = req.body.itemList;
    var total_cost = 0;

    itemList.forEach((element) => {
      total_cost = parseInt(total_cost) + parseInt(element.item_total_price);
      console.log(total_cost + "\n");
    });

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
        "/gentaxInvoice.ejs"
      );
      
      var TaxInvoice = req.body.TaxInvoicedata[0];
      console.log(TaxInvoice);

      const html = await ejs.renderFile(filePathName, {
        itemList: itemList,
        contactData: req.body.contactDetails,

        po_no: TaxInvoice.po_no,
        po_date: TaxInvoice.po_date,
        invoice_no: TaxInvoice.invoice_no,
        invoice_date: TaxInvoice.invoice_date,
        challan_no: TaxInvoice.challan_no,
        challan_date: TaxInvoice.challan_date,

        customer_name: TaxInvoice.customer_name,
        customer_phone: TaxInvoice.customer_phone,
        customer_address: TaxInvoice.customer_address,
        company_name: TaxInvoice.company_name,
        gst_no: TaxInvoice.gst_no,


        total_cost: total_cost,

        watermark: watermark,
        logo: logo,
      });
      await page.setContent(html);

      // create a new pdf document
      const pdf = await page.pdf({
        printBackground: true,
        path: "./pdf/Invoicepdf.pdf",
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

const sendMailTaxInvoice = async (req, res) => {
  try {
    console.log("sendMail", req.body.contactDetails);
    const bodyMsg = "This is Quotation for customer";

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
      to: req.body.contactDetails.contact_email,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "TaxInvoice.pdf", // <= Here: made sure file name match
          path: path.join(__dirname, "/pdf/Invoicepdf.pdf"), // <= Here
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

const downloadTaxInvoice = async (req, res) => {
  try {
    console.log("download taxinvoice", req.body);
    var taxinvoicePath = path.join(__dirname, "/pdf/Invoicepdf.pdf");
    console.log("file", taxinvoicePath);

    return res.status(200).download(taxinvoicePath);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const pdfgenChallan = async (req, res) => {
  try {
    console.log(__dirname, req.body.TaxInvoicedata);
    var itemList = req.body.itemList;
    var total_cost = 0;

    itemList.forEach((element) => {
      total_cost = parseInt(total_cost) + parseInt(element.item_total_price);
      console.log(total_cost + "\n");
    });

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
        "/genchallan.ejs"
      );
      
      var TaxInvoice = req.body.TaxInvoicedata[0];
      console.log(TaxInvoice);

      const html = await ejs.renderFile(filePathName, {
        itemList: itemList,
        contactData: req.body.contactDetails,
        TaxInvoice: req.body.TaxInvoicedata,

        po_no: TaxInvoice.po_no,
        po_date: TaxInvoice.po_date,
        invoice_no: TaxInvoice.invoice_no,
        invoice_date: TaxInvoice.invoice_date,
        challan_no: TaxInvoice.challan_no,
        challan_date: TaxInvoice.challan_date,

        customer_name: TaxInvoice.customer_name,
        customer_phone: TaxInvoice.customer_phone,
        customer_address: TaxInvoice.customer_address,
        company_name: TaxInvoice.company_name,
        gst_no: TaxInvoice.gst_no,
        vendor_no: TaxInvoice.vendor_no,

        total_cost: total_cost,

        watermark: watermark,
        logo: logo,
      });
      await page.setContent(html);

      // create a new pdf document
      const pdf = await page.pdf({
        printBackground: true,
        path: "./pdf/Challanpdf.pdf",
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

const sendMailChallan = async (req, res) => {
  try {
    console.log("sendMail", req.body.contactDetails);
    const bodyMsg = "This is Quotation for customer";

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
      to: req.body.contactDetails.contact_email,
      subject: "Hello ✔ New Request for contacting AEGIS projects",
      text: bodyMsg,
      attachments: [
        {
          filename: "Challan.pdf", // <= Here: made sure file name match
          path: path.join(__dirname, "/pdf/Challanpdf.pdf"), // <= Here
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

const downloadChallan = async (req, res) => {
  try {
    console.log("download Challan", req.body);
    var ChallanPath = path.join(__dirname, "/pdf/Challanpdf.pdf");
    console.log("file", ChallanPath);

    return res.status(200).download(ChallanPath);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  pdfgenProduct,
  sendMailProduct,
  addProductOrder,
  getAllProductOrder,
  getEnquiryProductOrder,
  addTaxInvoice,
  getTaxInvoice,
  deleteTaxInvoice,
  pdfgenTaxInvoice,
  pdfgenChallan,
  downloadTaxInvoice,
  sendMailTaxInvoice,
  sendMailChallan,
  downloadChallan,
};
