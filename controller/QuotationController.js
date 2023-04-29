import Quotation from "../model/QuotationModal.js";

const getAllQuotation = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allQuotation = await Quotation.find({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allQuotation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getQuotation = async (req, res) => {
  console.log(req.body);
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const enquiry_id = req.body.enquiry_id;

    const allQuotation = await Quotation.find({
      employee_id: employee_id,
      employee_email: employee_email,
      enquiry_id: enquiry_id,
    });
    return res.status(200).json(allQuotation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addQuotation = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addquotation", req.body);

    const newQuotation = new Quotation(req.body);
    await newQuotation.save();

    return res.status(200).json(newQuotation);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const editQuotation = async (req, res) => {
  try {
    console.log("editQuotation", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const quotation_id = req.body.quotation_id;

    const updatedQuotation = await Quotation.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        _id: quotation_id,
      },
      req.body
    );

    console.log("Quotation updated", updatedQuotation);
    return res.status(200).json({ message: "quotation updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteQuotation = async (req, res) => {
  try {
    console.log("deleteQuotation", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const quotation_id = req.body.quotation_id;

    const deletedQuotation = await Quotation.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: quotation_id,
    });
    console.log("quotation deleted", deletedQuotation);
    return res.status(200).json({ message: "quotation deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  getAllQuotation,
  getQuotation,
  addQuotation,
  deleteQuotation,
  editQuotation,
};
