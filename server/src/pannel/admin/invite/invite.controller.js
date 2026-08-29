import sendStudentInvite from "./invite.mail.js";

export const sendStudentMail = async (req, res) => {
  try {
    console.log("[sendStudentMail] Incoming request body:", req.body);
    const { studentName, studentEmail, studentCode } = req.body;
    console.log("[sendStudentMail] studentName:", studentName);
    console.log("[sendStudentMail] studentEmail:", studentEmail);
    console.log("[sendStudentMail] studentCode:", studentCode);

    if (
      typeof studentName !== "string" ||
      typeof studentEmail !== "string" ||
      typeof studentCode !== "string"
    ) {
      console.log("[sendStudentMail] Invalid payload types detected");
      return res.status(400).json({
        success: false,
        message:
          "studentName, studentEmail, and studentCode must all be strings",
      });
    }

    const normalizedStudentName = studentName.trim();
    const normalizedStudentEmail = studentEmail.trim();
    const normalizedStudentCode = studentCode.trim();

    console.log(
      "[sendStudentMail] normalizedStudentName:",
      normalizedStudentName,
    );
    console.log(
      "[sendStudentMail] normalizedStudentEmail:",
      normalizedStudentEmail,
    );
    console.log(
      "[sendStudentMail] normalizedStudentCode:",
      normalizedStudentCode,
    );

    if (
      !normalizedStudentName ||
      !normalizedStudentEmail ||
      !normalizedStudentCode
    ) {
      console.log("[sendStudentMail] Missing required fields after trim");
      return res.status(400).json({
        success: false,
        message: "Name, email and invitation code are required",
      });
    }

    const resendResult = await sendStudentInvite({
      studentName: normalizedStudentName,
      studentEmail: normalizedStudentEmail,
      studentCode: normalizedStudentCode,
    });

    console.log("[sendStudentMail] Resend result:", resendResult);

    return res.status(200).json({
      success: true,
      message: "Student invitation email sent successfully",
      data: resendResult,
    });
  } catch (error) {
    console.error("[sendStudentMail] Failed to send student invite:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send invitation email",
      error: error.message,
    });
  }
};
