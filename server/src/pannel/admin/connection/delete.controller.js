import { signupModel } from "../../employee/auth/auth.model.js";

import { signupModel as studentModel } from "../../student/auth/auth.model.js";

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await signupModel.findOneAndDelete({
      _id: id,
      institutionId: req.user.id,
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Teacher Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete teacher.",
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentModel.findOneAndDelete({
      _id: id,
      institutionId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student.",
    });
  }
};
