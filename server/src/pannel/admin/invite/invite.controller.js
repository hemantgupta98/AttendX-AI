import { sendStudentInvite, sendTeacherInvite } from "./invite.mail.js";

export const sendStudentMail = async (req, res) => {
  try {
    const { studentName, studentEmail } = req.body;
    const providedCode = req.user?.adminCode || req.body?.studentCode || "";

    if (typeof studentName !== "string" || typeof studentEmail !== "string") {
      console.log("[sendStudentMail] Invalid payload types detected");
      return res.status(400).json({
        success: false,
        message: "studentName and studentEmail must be strings",
      });
    }

    const normalizedStudentName = studentName.trim();
    const normalizedStudentEmail = studentEmail.trim();
    const normalizedStudentCode = String(providedCode || "").trim();

    if (!normalizedStudentName || !normalizedStudentEmail) {
      console.log("[sendStudentMail] Missing required fields after trim");
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    if (!normalizedStudentCode) {
      console.log(
        "[sendStudentMail] No student code available from admin profile or request body",
      );
      return res.status(400).json({
        success: false,
        message:
          "Invitation code not available. Ensure admin is authenticated and has an adminCode",
      });
    }

    const mailResult = await sendStudentInvite({
      studentName: normalizedStudentName,
      studentEmail: normalizedStudentEmail,
      studentCode: normalizedStudentCode,
    });

    console.log("[sendStudentMail] Brevo result:", mailResult);

    return res.status(200).json({
      success: true,
      message: "Student invitation email sent successfully",
      data: mailResult,
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

export const sendTeacherMail = async (req, res) => {
  try {
    const { teacherName, teacherEmail } = req.body;
    const providedCode = req.user?.adminCode || req.body?.teacherCode || "";

    if (typeof teacherName !== "string" || typeof teacherEmail !== "string") {
      console.log("[sendTeacherMail] Invalid payload types detected");
      return res.status(400).json({
        success: false,
        message:
          "teacherName, teacherEmail, and teacherCode must all be strings",
      });
    }

    const normalizedTeacherName = teacherName.trim();
    const normalizedTeacherEmail = teacherEmail.trim();
    const normalizedTeacherCode = String(providedCode || "").trim();

    if (
      !normalizedTeacherName ||
      !normalizedTeacherEmail ||
      !normalizedTeacherCode
    ) {
      console.log("[sendTeacherMail] Missing required fields after trim");
      return res.status(400).json({
        success: false,
        message: "Name, email and invitation code are required",
      });
    }

    if (!normalizedTeacherCode) {
      console.log(
        "[sendTeacherMail] No student code available from admin profile or request body",
      );
      return res.status(400).json({
        success: false,
        message:
          "Invitation code not available. Ensure admin is authenticated and has an adminCode",
      });
    }

    const mailResult = await sendTeacherInvite({
      teacherName: normalizedTeacherName,
      teacherEmail: normalizedTeacherEmail,
      teacherCode: normalizedTeacherCode,
    });

    console.log("[sendTeacherMail] Brevo result:", mailResult);

    return res.status(200).json({
      success: true,
      message: "Teacher invitation email sent successfully",
      data: mailResult,
    });
  } catch (error) {
    console.error("[sendTeacherMail] Failed to send teacher invite:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send invitation email",
      error: error.message,
    });
  }
};
