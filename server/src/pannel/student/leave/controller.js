import { LeaveModel } from "./model.js";

export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date.",
      });
    }

    // Maximum 4 leave requests in the current month
    const firstDay = new Date(start.getFullYear(), start.getMonth(), 1);
    const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 1);

    const leaveCount = await LeaveModel.countDocuments({
      studentId: req.user.id,
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
      studentId: req.user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      attachment: req.file?.path || "",
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

export const getStudentLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find({
      studentId: req.user.id,
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
};
