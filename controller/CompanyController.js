import Company from "../model/CompanyModal.js";

// adding a single company in database
const addCompany = async (req, res) => {
  try {
    console.log("add company", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const employeeExist = await Company.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });

    if (employeeExist) {
      console.log("employee exists");

      // if company exists then we will add the companies data inside the array of it
      const updateCompanies = await Company.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            companies: req.body,
          },
        }
      );
      console.log("companies updated successfully", updateCompanies);

      return res
        .status(200)
        .json({ message: "companies updated successfully" });
    } else {
      console.log("employee dont exists");
      // if company field document is not found then create one and then later update it later
      const newCompany = new Company({
        employee_id: employee_id,
        employee_email: employee_email,
      });
      await newCompany.save();
      console.log("new company added successfully", newCompany);

      // if company not exists then after creating it we will add the companies inside the array of it
      const updateCompanies = await Company.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            companies: req.body,
          },
        }
      );
      console.log("company added & updated successfully", updateCompanies);

      return res
        .status(200)
        .json({ message: "company added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all companies data from database
const getAllCompanys = async (req, res) => {
  try {
    console.log("getting all companys data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allCompanies = await Company.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allCompanies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting a single company data from database
const getCompany = async (req, res) => {
  try {
    console.log("getting a single company data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const company_id = req.body.company_id;

    const allCompanies = await Company.findOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        companies: { $elemMatch: { _id: company_id } },
      }
    );
    console.log(allCompanies);
    return res.status(200).json(allCompanies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// editting a single company data from database
const editcompany = async (req, res) => {
  try {
    console.log("edit company", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const company_id = req.body._id;

    const updateCompany = await Company.updateOne(
      { employee_id: employee_id, employee_email: employee_email, "companies._id": company_id },
      {
        $set: {
          "companies.$": req.body,
        },
      }
    );

    console.log("updateCompany", updateCompany);

    return res.status(200).json({ message: "company updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// deleting a single company data from database
const deleteCompany = async (req, res) => {
  try {
    console.log("delete Company", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const company_id = req.body.company_id;

    const deleteCompany = await Company.updateOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        $pull: { companies: { _id: company_id } }
      }
    );

    console.log("deleteCompany", deleteCompany);

    return res.status(200).json({ message: "company deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addCompany, getAllCompanys, getCompany, editcompany, deleteCompany };
