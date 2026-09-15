import { LeaveModel } from "../../employee/leave/model.js";

export const getEmployeeLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find({ adminId: req.user.id })
      .populate("employeeId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves: leaves.map((leave) => ({
        ...leave.toObject(),
        name: leave.employeeId?.name || "",
        email: leave.employeeId?.email || "",
      })),
    });
  } catch (error) {
    console.error("Get Employee Leaves Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee leave requests.",
    });
  }
};

export const updateEmployeeLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected.",
      });
    }

    const leave = await LeaveModel.findOneAndUpdate(
      { _id: id, adminId: req.user.id },
      { status },
      { new: true, runValidators: true },
    ).populate("employeeId", "name email");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully.",
      leave,
    });
  } catch (error) {
    console.error("Update Employee Leave Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update leave status.",
    });
  }
};