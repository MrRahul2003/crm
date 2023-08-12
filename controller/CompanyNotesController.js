// Modal
import CompanyNote from "../model/CompanyNotesModal.js";

// adding a single companyNote in database
const addCompanyNote = async (req, res) => {
  try {
    console.log("add companyNote", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const employeeExist = await CompanyNote.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });

    if (employeeExist) {
      console.log("employee exists");

      // if companyNote exists then we will add the notes data inside the array of it
      const updateCompanies = await CompanyNote.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            notes: req.body,
          },
        }
      );
      console.log("notes updated successfully", updateCompanies);

      return res
        .status(200)
        .json({ message: "notes updated successfully" });
    } else {
      console.log("employee dont exists");
      // if companyNote field document is not found then create one and then later update it later
      const newCompanyNote = new CompanyNote({
        employee_id: employee_id,
        employee_email: employee_email,
      });
      await newCompanyNote.save();
      console.log("new companyNote added successfully", newCompanyNote);

      // if companyNote not exists then after creating it we will add the notes inside the array of it
      const updateCompanies = await CompanyNote.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            notes: req.body,
          },
        }
      );
      console.log("companyNote added & updated successfully", updateCompanies);

      return res
        .status(200)
        .json({ message: "companyNote added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all notes data from database
const getAllCompanyNotes = async (req, res) => {
  try {
    console.log("getting all companyNotes data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allCompanies = await CompanyNote.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allCompanies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting a single companyNote data from database
const getCompanyNote = async (req, res) => {
  try {
    console.log("getting a single companyNote data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const companyNote_id = req.body.companyNote_id;

    const allCompanies = await CompanyNote.findOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        notes: { $elemMatch: { _id: companyNote_id } },
      }
    );
    console.log(allCompanies);
    return res.status(200).json(allCompanies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// deleting a single companyNote data from database
const deleteCompanyNote = async (req, res) => {
  try {
    console.log("delete CompanyNote", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const companyNote_id = req.body.note_id;

    const deleteCompanyNote = await CompanyNote.updateOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        $pull: { notes: { _id: companyNote_id } }
      }
    );

    console.log("deleteCompanyNote", deleteCompanyNote);

    return res.status(200).json({ message: "companyNote deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addCompanyNote, getAllCompanyNotes, getCompanyNote, deleteCompanyNote };
