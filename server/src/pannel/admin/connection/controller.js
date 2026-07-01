import { signupModel } from "../auth/auth.model";

export const getTeacher = async (req, res) => {
  try {
    const teachers = await signupModel
      .find({ institutionId: String(req.user.id) })
      .select(
        "userId name gender dob photo teacherNumber parentNumber address city state pincode institutionName employeeID class subject joiningYear email institutionId",
      );

    res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      totalTeacher: teachers.length,
      teachers: teachers.map((user) => ({
        userId: user.userId || "",
        id: user._id,
        institutionId: user.institutionId || "",
        name: user.name || "",
        gender: user.gender || "",
        dob: user.dob || "",
        photo: user.photo || "",
        teacherNumber: user.teacherNumber || "",
        parentNumber: user.parentNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        institutionName: user.institutionName || "",
        employeeID: user.employeeID || "",
        class: user.class || "",
        subject: user.subject || "",
        joiningYear: user.joiningYear || "",
        email: user.email || "",
      })),
    });
  } catch (error) {
    console.error("Get Teachers Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers.",
    });
  }
};
