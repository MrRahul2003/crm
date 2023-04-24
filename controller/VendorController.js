import Vendor from "../model/VendorModal.js";

const getAllVendor = async (req, res) => {
  console.log(req.body);
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allVendor = await Vendor.find({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allVendor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getVendor = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const vendor_id = req.body.vendor_id;

    const allVendor = await Vendor.find({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: vendor_id,
    });
    return res.status(200).json(allVendor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addVendor = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addvendor", req.body);

    const newVendor = new Vendor(req.body);
    await newVendor.save();

    return res.status(200).json(newVendor);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const editVendor = async (req, res) => {
  try {
    console.log("editVendor", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const vendor_id = req.body._id;

    const updatedVendor = await Vendor.updateOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: vendor_id,
    }, req.body);

    console.log("Vendor updated", updatedVendor);
    return res.status(200).json({ message: "vendor updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteVendor = async (req, res) => {
  try {
    console.log("deleteVendor", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const vendor_id = req.body.vendor_id;

    const deletedVendor = await Vendor.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: vendor_id,
    });
    console.log("vendor deleted", deletedVendor);
    return res.status(200).json({ message: "vendor deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { getAllVendor, getVendor, addVendor, deleteVendor, editVendor };
