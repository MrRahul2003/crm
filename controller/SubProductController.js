// Modal
import SubProduct from "../model/SubProductModal.js";

// adding a single subproduct in database
const addSubProduct = async (req, res) => {
  try {
    console.log("add subproduct", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const employeeExist = await SubProduct.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      product_id: product_id,
    });

    if (employeeExist) {
      console.log("employee exists");

      // if subproduct exists then we will add the s data inside the array of it
      const updateSubProduct = await SubProduct.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          product_id: product_id,
        },
        {
          $push: {
            subproduct: req.body,
          },
        }
      );
      console.log("subproduct updated successfully", updateSubProduct);

      return res
        .status(200)
        .json({ message: "subproduct updated successfully" });
    } else {
      console.log("employee dont exists");
      // if subproduct field document is not found then create one and then later update it later
      const newSubProduct = new SubProduct({
        employee_id: employee_id,
        employee_email: employee_email,
        product_id: product_id,
      });
      await newSubProduct.save();
      console.log("new subproduct added successfully", newSubProduct);

      // if subproduct not exists then after creating it we will add the s inside the array of it
      const updateSubProduct = await SubProduct.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          product_id: product_id,
        },
        {
          $push: {
            subproduct: req.body,
          },
        }
      );
      console.log("subproduct added & updated successfully", updateSubProduct);

      return res
        .status(200)
        .json({ message: "subproduct added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all s data from database
const getAllSubProducts = async (req, res) => {
  try {
    console.log("getting all subproducts data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const allSubProduct = await SubProduct.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      product_id: product_id,
    });
    return res.status(200).json(allSubProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all s data from database
const getSubProduct = async (req, res) => {
  try {
    console.log("getting a subproduct data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;
    const subproduct_id = req.body.subproduct_id;

    const allSubProduct = await SubProduct.findOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        product_id: product_id,
      },
      {
        subproduct: { $elemMatch: { _id: subproduct_id } },
      }
    );
    return res.status(200).json(allSubProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting a single subproduct data from database
const getSomeSubProduct = async (req, res) => {
  try {
    console.log("getting a single subproduct data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const allSubProduct = await SubProduct.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      product_id: product_id,
    });
    console.log(SomeSubProduct);
    return res.status(200).json(SomeSubProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// deleting a single subproduct data from database
const deleteSubProduct = async (req, res) => {
  try {
    console.log("delete SubProduct", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const product_id = req.body.product_id;
    const subproduct_id = req.body.subproduct_id;

    const deleteSubProduct = await SubProduct.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        product_id: product_id,
      },
      {
        $pull: { subproduct: { _id: subproduct_id } },
      }
    );

    console.log("deleteSubProduct", deleteSubProduct);

    return res.status(200).json({ message: "subproduct deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// deleting a single subproduct data from database
const deleteEntireSubProduct = async (req, res) => {
  try {
    console.log("deleteEntireSubProduct", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const deletedSubProduct = await SubProduct.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,
      product_id: product_id,
    });
    console.log("subproduct deleted", deletedSubProduct);
    return res.status(200).json({ message: "subproduct deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// editting a single product data from database
const editSubProduct = async (req, res) => {
  try {
    console.log("edit product", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const product_id = req.body.product_id;
    const subproduct_id = req.body.subproduct_id;

    const updateProduct = await SubProduct.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        product_id: product_id,
        "subproduct._id": subproduct_id,
      },
      {
        $set: {
          "subproduct.$": req.body,
        },
      }
    );

    console.log("updateProduct", updateProduct);

    return res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  addSubProduct,
  getAllSubProducts,
  getSubProduct,
  getSomeSubProduct,
  deleteSubProduct,
  deleteEntireSubProduct,
  editSubProduct,
};
