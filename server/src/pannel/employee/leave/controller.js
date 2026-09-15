import { LeaveModel } from "./model.js";
import { signupModel as employeeModel } from "../auth/auth.model.js";
import { uploadImage } from "../media/cloudinary.js";

export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason, file } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const fileInput = req.file?.path || file || req.body.attachment;

    if (!fileInput) {
      return res.status(400).json({
        success: false,
        message: "Failed to send file.",
      });
    }

    const imageUrl =
      req.file || fileInput !== req.body.attachment
        ? (await uploadImage(fileInput, "upload-image/employeeLeave"))
            .secure_url
        : req.body.attachment;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date.",
      });
    }

    const employee = await employeeModel
      .findById(req.user.id)
      .select("institutionId");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!employee.institutionId) {
      return res.status(400).json({
        success: false,
        message: "You are not assigned to any institution.",
      });
    }

    const firstDay = new Date(start.getFullYear(), start.getMonth(), 1);
    const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 1);

    const leaveCount = await LeaveModel.countDocuments({
      employeeId: req.user.id,
      createdAt: {
        $gte: firstDay,
        $lt: lastDay,
      },
    });

    if (leaveCount >= 4) {
      return res.status(400).json({
        success: false,
        message: "You can apply for only 4 leave requests in a month.",
      });
    }

    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leave = await LeaveModel.create({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      attachment: imageUrl,
      adminId: employee.institutionId,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully.",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeLeaves = async (req, res) => {
  try {
    const isAdminRequest = Boolean(req.user.adminCode);
    const leavesQuery = LeaveModel.find(
      isAdminRequest ? {} : { employeeId: req.user.id },
    ).sort({ createdAt: -1 });

    if (isAdminRequest) {
      leavesQuery.populate("employeeId", "name email photo");
    }

    const leaves = await leavesQuery.lean();
    const responseLeaves = isAdminRequest
      ? leaves.map((leave) => ({
          ...leave,
          name: leave.employeeId?.name || "Unknown employee",
          email: leave.employeeId?.email || "",
          photo: leave.employeeId?.photo || "",
        }))
      : leaves;

    return res.status(200).json({
      success: true,
      count: responseLeaves.length,
      leaves: responseLeaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await LeaveModel.findOne({
      _id: id,
      employeeId: req.user.id,
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found.",
      });
    }

    await LeaveModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Leave request deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Leave Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete leave request.",
    });
  }
};

export const updateLeave = async (req, res) => {
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
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully.",
      leave,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

{
  /**export const getEmployeeLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find({
      employeeId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; */
}
