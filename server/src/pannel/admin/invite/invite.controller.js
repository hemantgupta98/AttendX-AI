import sendStudentInvite from "./invite.mail.js";

export const sendStudentMail = async (req, res) => {
  try {
    const { studentName, studentEmail, studentCode } = req.body;

    if (!studentName || !studentEmail || !studentCode) {
      return res.status(400).json({
        success: false,
        message: "Name, email and invitation code are required",
      });
    }

    await sendStudentInvite({
      studentName,
      studentEmail,
      studentCode,
    });
    return res.status(200).json({
      success: true,
      message: "Student invitation email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send invitation email",
      error: error.message,
    });
  }
};
