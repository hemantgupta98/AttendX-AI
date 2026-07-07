import cron from "node-cron";
import { LeaveModel } from "./model.js";

cron.schedule("* * * * *", async () => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  await LeaveModel.updateMany(
    {
      status: "Pending",
      createdAt: { $lte: fiveMinutesAgo },
    },
    {
      $set: {
        status: "Approved",
      },
    },
  );

  console.log("Checked pending leave requests");
});
