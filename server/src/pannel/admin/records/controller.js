import PDFDocument from "pdfkit";
import { attendance } from "../database/attendance.model.js";

export const downloadAttendancePdf = async (req, res) => {
  try {
    // =========================================================
    // 1. ADMIN AUTHENTICATION
    // =========================================================

    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required",
      });
    }

    // =========================================================
    // 2. GET ATTENDANCE RECORDS
    // =========================================================

    const attendanceRecords = await attendance
      .find({ admin: adminId })
      .sort({ date: -1, createdAt: -1 });

    if (!attendanceRecords.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance record found",
      });
    }

    // =========================================================
    // 3. CREATE PDF
    // =========================================================

    const doc = new PDFDocument({
      size: "A4",
      margin: 30,
      bufferPages: true,
    });

    const pdfChunks = [];

    const pdfReady = new Promise((resolve, reject) => {
      doc.on("data", (chunk) => {
        pdfChunks.push(chunk);
      });

      doc.once("end", resolve);
      doc.once("error", reject);
    });

    // =========================================================
    // 4. REPORT INFORMATION
    // =========================================================

    const institutionName =
      req.user?.institutionName || req.user?.institution || "Institution";

    const generatedDate = new Date();

    const formattedGeneratedDate = generatedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedGeneratedTime = generatedDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // =========================================================
    // 5. CALCULATE SUMMARY
    // =========================================================

    const total = attendanceRecords.length;

    const present = attendanceRecords.filter(
      (item) => item.status === "Present",
    ).length;

    const absent = attendanceRecords.filter(
      (item) => item.status === "Absent",
    ).length;

    const matched = attendanceRecords.filter(
      (item) => item.matched === true,
    ).length;

    const failed = attendanceRecords.filter(
      (item) => item.matched === false,
    ).length;

    const attendancePercentage =
      total > 0 ? ((present / total) * 100).toFixed(2) : "0.00";

    const matchPercentage =
      total > 0 ? ((matched / total) * 100).toFixed(2) : "0.00";

    const confidenceValues = attendanceRecords
      .map((item) => Number(item.confidence))
      .filter((value) => !Number.isNaN(value) && value >= 0);

    const averageConfidence =
      confidenceValues.length > 0
        ? (
            (confidenceValues.reduce((sum, value) => sum + value, 0) /
              confidenceValues.length) *
            100
          ).toFixed(2)
        : "0.00";

    // =========================================================
    // 6. GET REPORT PERIOD
    // =========================================================

    const dates = attendanceRecords
      .map((item) => item.date)
      .filter(Boolean)
      .map((date) => new Date(date).getTime());

    const earliestDate = dates.length > 0 ? new Date(Math.min(...dates)) : null;

    const latestDate = dates.length > 0 ? new Date(Math.max(...dates)) : null;

    const formatDate = (date) => {
      if (!date) return "-";

      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    // =========================================================
    // 7. HEADER
    // =========================================================

    doc.font("Helvetica-Bold").fontSize(22).text("ATTENDANCE REPORT", {
      align: "center",
    });

    doc.moveDown(0.3);

    doc.font("Helvetica-Bold").fontSize(12).text(institutionName, {
      align: "center",
    });

    doc.moveDown(0.3);

    doc
      .font("Helvetica")
      .fontSize(9)
      .text(
        `Generated on ${formattedGeneratedDate} at ${formattedGeneratedTime}`,
        {
          align: "center",
        },
      );

    // Horizontal line

    doc.moveDown(0.8);

    doc.moveTo(30, doc.y).lineTo(565, doc.y).lineWidth(1).stroke();

    doc.moveDown(1);

    // =========================================================
    // 8. REPORT DETAILS
    // =========================================================

    doc.font("Helvetica-Bold").fontSize(11).text("REPORT DETAILS");

    doc.moveDown(0.5);

    const detailsY = doc.y;

    doc.font("Helvetica").fontSize(9);

    doc.text(
      `Report Period: ${formatDate(earliestDate)} - ${formatDate(latestDate)}`,
      30,
      detailsY,
    );

    doc.text(`Total Attendance Records: ${total}`, 300, detailsY);

    doc.text(`Attendance Rate: ${attendancePercentage}%`, 30, detailsY + 18);

    doc.text(`Match Rate: ${matchPercentage}%`, 300, detailsY + 18);

    doc.moveDown(3);

    // =========================================================
    // 9. SUMMARY SECTION
    // =========================================================

    doc.font("Helvetica-Bold").fontSize(11).text("ATTENDANCE SUMMARY");

    doc.moveDown(0.7);

    const summaryY = doc.y;

    const boxWidth = 100;
    const boxHeight = 55;
    const gap = 8;

    const summaryItems = [
      {
        title: "TOTAL",
        value: total,
      },
      {
        title: "PRESENT",
        value: present,
      },
      {
        title: "ABSENT",
        value: absent,
      },
      {
        title: "MATCHED",
        value: matched,
      },
      {
        title: "FAILED",
        value: failed,
      },
    ];

    summaryItems.forEach((item, index) => {
      const x = 30 + index * (boxWidth + gap);

      // Box
      doc
        .roundedRect(x, summaryY, boxWidth, boxHeight, 5)
        .lineWidth(0.7)
        .stroke();

      // Title
      doc
        .font("Helvetica-Bold")
        .fontSize(7)
        .text(item.title, x, summaryY + 9, {
          width: boxWidth,
          align: "center",
        });

      // Value
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .text(String(item.value), x, summaryY + 23, {
          width: boxWidth,
          align: "center",
        });
    });

    doc.y = summaryY + boxHeight + 20;

    // =========================================================
    // 10. ADDITIONAL STATISTICS
    // =========================================================

    doc.font("Helvetica-Bold").fontSize(11).text("PERFORMANCE OVERVIEW");

    doc.moveDown(0.6);

    doc.font("Helvetica").fontSize(9);

    doc.text(`Attendance Percentage: ${attendancePercentage}%`);

    doc.text(`Face Match Percentage: ${matchPercentage}%`);

    doc.text(`Average Face Confidence: ${averageConfidence}%`);

    doc.moveDown(1.5);

    // =========================================================
    // 11. TABLE CONFIGURATION
    // =========================================================

    const columns = [
      {
        label: "Name",
        width: 150,
      },
      {
        label: "Date",
        width: 75,
      },
      {
        label: "Time",
        width: 65,
      },
      {
        label: "Status",
        width: 75,
      },
      {
        label: "Matched",
        width: 85,
      },
      {
        label: "Confidence",
        width: 85,
      },
    ];

    const tableLeft = 30;
    const tableWidth = 535;
    const rowHeight = 20;

    // =========================================================
    // 12. TABLE HEADER
    // =========================================================

    const drawTableHeader = () => {
      const headerY = doc.y;

      // Header background
      doc
        .rect(tableLeft, headerY - 3, tableWidth, rowHeight + 6)
        .fill("#E9EEF5");

      let x = tableLeft;

      doc.font("Helvetica-Bold").fontSize(8);

      columns.forEach((column) => {
        doc.text(column.label, x, headerY, {
          width: column.width,
          height: rowHeight,
          align: "left",
          lineBreak: false,
        });

        x += column.width;
      });

      // Bottom border
      doc
        .moveTo(tableLeft, headerY + rowHeight + 3)
        .lineTo(tableLeft + tableWidth, headerY + rowHeight + 3)
        .lineWidth(1)
        .stroke();

      // Move below header
      doc.y = headerY + rowHeight + 8;
    };

    drawTableHeader();

    // =========================================================
    // 13. TABLE ROWS
    // =========================================================

    attendanceRecords.forEach((item, rowIndex) => {
      // Check page space
      if (doc.y + rowHeight > 750) {
        doc.addPage();

        drawTableHeader();
      }

      const rowY = doc.y;

      // Alternate row background
      if (rowIndex % 2 === 1) {
        doc.rect(tableLeft, rowY - 3, tableWidth, rowHeight).fill("#F7F9FC");
      }

      let x = tableLeft;

      doc.font("Helvetica").fontSize(8).fill("#000000");

      // -------------------------------------------------------
      // NAME
      // -------------------------------------------------------

      doc.text(item.name || "Unknown", x, rowY, {
        width: columns[0].width,
        height: rowHeight,
        lineBreak: false,
        ellipsis: true,
      });

      x += columns[0].width;

      // -------------------------------------------------------
      // DATE
      // -------------------------------------------------------

      doc.text(formatDate(item.date), x, rowY, {
        width: columns[1].width,
        height: rowHeight,
        lineBreak: false,
      });

      x += columns[1].width;

      // -------------------------------------------------------
      // TIME
      // -------------------------------------------------------

      doc.text(item.time || "-", x, rowY, {
        width: columns[2].width,
        height: rowHeight,
        lineBreak: false,
      });

      x += columns[2].width;

      // -------------------------------------------------------
      // STATUS
      // -------------------------------------------------------

      doc.text(item.status || "-", x, rowY, {
        width: columns[3].width,
        height: rowHeight,
        lineBreak: false,
      });

      x += columns[3].width;

      // -------------------------------------------------------
      // MATCHED
      // -------------------------------------------------------

      doc.text(item.matched ? "Matched" : "Failed", x, rowY, {
        width: columns[4].width,
        height: rowHeight,
        lineBreak: false,
      });

      x += columns[4].width;

      // -------------------------------------------------------
      // CONFIDENCE
      // -------------------------------------------------------

      let confidence = "-";

      if (
        item.confidence !== null &&
        item.confidence !== undefined &&
        !Number.isNaN(Number(item.confidence))
      ) {
        confidence = `${(Number(item.confidence) * 100).toFixed(2)}%`;
      }

      doc.text(confidence, x, rowY, {
        width: columns[5].width,
        height: rowHeight,
        lineBreak: false,
      });

      // Bottom row line
      doc
        .moveTo(tableLeft, rowY + rowHeight - 2)
        .lineTo(tableLeft + tableWidth, rowY + rowHeight - 2)
        .lineWidth(0.2)
        .stroke();

      // Move to next row
      doc.y = rowY + rowHeight;
    });

    // =========================================================
    // 14. FOOTER
    // =========================================================

    doc.moveDown(2);

    doc.moveTo(30, doc.y).lineTo(565, doc.y).lineWidth(0.5).stroke();

    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(8)
      .text(
        "This attendance report was generated automatically by the Attendance Management System.",
        {
          align: "center",
        },
      );

    doc.moveDown(0.3);

    doc
      .fontSize(7)
      .text(
        "The information contained in this report is based on recorded attendance and face-matching results.",
        {
          align: "center",
        },
      );

    // =========================================================
    // 15. PAGE NUMBERS
    // =========================================================

    const range = doc.bufferedPageRange();

    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);

      doc
        .font("Helvetica")
        .fontSize(7)
        .fill("#555555")
        .text(`Page ${i + 1} of ${range.count}`, 30, 810, {
          width: 535,
          align: "center",
        });
    }

    // =========================================================
    // 16. FINISH PDF
    // =========================================================

    doc.end();

    await pdfReady;

    // =========================================================
    // 17. SEND PDF
    // =========================================================

    const pdfBuffer = Buffer.concat(pdfChunks);

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Attendance_Report.pdf"',
    );

    res.setHeader("Content-Length", pdfBuffer.length);

    return res.end(pdfBuffer);
  } catch (error) {
    console.error("PDF Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate PDF",
        error: error.message,
      });
    }
  }
};
