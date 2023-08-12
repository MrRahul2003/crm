import VendorPayment from "../model/VendorPaymentModal.js";
import VendorTaxInvoice from "../model/VendorTaxInvoice.js";

const addVendorTaxInvoice = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addVendorTaxInvoice", req.body);

    const newVendorTaxInvoice = new VendorTaxInvoice(req.body);
    await newVendorTaxInvoice.save();

    return res.status(200).json(newVendorTaxInvoice);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getVendorTaxInvoice = async (req, res) => {
  console.log(req.body);
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const vendor_id = req.body.vendor_id;
    const enquiry_id = req.body.enquiry_id;
    const quotation_id = req.body.quotation_id;

    const Invoice = await VendorTaxInvoice.find({
      employee_id: employee_id,
      employee_email: employee_email,
      vendor_id: vendor_id,
      enquiry_id: enquiry_id,
      quotation_id: quotation_id,
    });
    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getallVendorTaxInvoice = async (req, res) => {
  console.log(req.body);
  try {
    const Invoice = await VendorTaxInvoice.find();
    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteVendorTaxInvoice = async (req, res) => {
  try {
    console.log("deleteVendorTaxInvoice", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const vendor_id = req.body.vendor_id;
    const quotation_id = req.body.quotation_id;
    const invoice_id = req.body.invoice_id;

    const deletedInvoice = await VendorTaxInvoice.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,

      vendor_id: vendor_id,
      quotation_id: quotation_id,
      _id: invoice_id,
    });
    console.log("deleteVendorTaxInvoice deleted", deletedInvoice);
    return res
      .status(200)
      .json({ message: "deleteVendorTaxInvoice deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addVendorPaymentData = async (req, res) => {
  try {
    console.log("addVendorPaymentData", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const InvoiceInfo_id = req.body.InvoiceInfo_id;
    const quotation_id = req.body.quotation_id;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const TaxInvoiceExist = await VendorPayment.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      InvoiceInfo_id: InvoiceInfo_id,
      quotation_id: quotation_id,
    });

    if (TaxInvoiceExist) {
      console.log("TaxInvoice Exists");

      // if TaxInvoice exists then we will add the payment data inside the array of it
      const updatePayment = await VendorPayment.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          InvoiceInfo_id: InvoiceInfo_id,
          quotation_id: quotation_id,
        },
        {
          $push: {
            vendorpayments: req.body,
          },
        }
      );
      console.log("vendorpayments updated successfully", updatePayment);

      return res
        .status(200)
        .json({ message: "vendorpayments updated successfully" });
    } else {
      console.log("TaxInvoice dont exists");
      // if taxinvoice field document is not found then create one and then later update it later
      const newTaxInvoicePayment = new VendorPayment({
        employee_id: employee_id,
        employee_email: employee_email,
        InvoiceInfo_id: InvoiceInfo_id,
        quotation_id: quotation_id,
      });
      await newTaxInvoicePayment.save();
      console.log(
        "new newTaxInvoicePayment added successfully",
        newTaxInvoicePayment
      );

      // if taxinvoce not exists then after creating it we will add the payments inside the array of it
      const updatePayment = await VendorPayment.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          InvoiceInfo_id: InvoiceInfo_id,
          quotation_id: quotation_id,
        },
        {
          $push: {
            vendorpayments: req.body,
          },
        }
      );
      console.log("vendorpayments updated successfully", updatePayment);

      return res
        .status(200)
        .json({ message: "vendorpayments added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getallVendorPaymentData = async (req, res) => {
  console.log(req.body);
  try {
    const Payments = await VendorPayment.find();
    return res.status(200).json(Payments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getVendorPaymentData = async (req, res) => {
  console.log(req.body);
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const InvoiceInfo_id = req.body.InvoiceInfo_id;
    const quotation_id = req.body.quotation_id;

    const Invoice = await VendorPayment.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      InvoiceInfo_id: InvoiceInfo_id,
      quotation_id: quotation_id,
    });
    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteVendorPayments = async (req, res) => {
  try {
    console.log("deleteVendorPayment", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const InvoiceInfo_id = req.body.InvoiceInfo_id;
    const quotation_id = req.body.quotation_id;
    const payment_id = req.body.payment_id;

    const deletedInvoice = await VendorPayment.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        InvoiceInfo_id: InvoiceInfo_id,
        quotation_id: quotation_id,
      },
      {
        $pull: { vendorpayments: { _id: payment_id } },
      }
    );
    console.log("deleteVendorPayment deleted", deletedInvoice);
    return res
      .status(200)
      .json({ message: "deleteVendorPayment deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  addVendorTaxInvoice,
  getVendorTaxInvoice,
  deleteVendorTaxInvoice,
  getallVendorTaxInvoice,
  addVendorPaymentData,
  getallVendorPaymentData,
  getVendorPaymentData,
  deleteVendorPayments,
};
