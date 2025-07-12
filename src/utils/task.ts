import cron from "node-cron";
import { User } from "../models/user.model";
import { sendActivationMail } from "./sendEmail";

export const userActivation = (): void => {
  cron.schedule("* * * * *", async () => {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      // const result = await User.updateMany(
      //   {
      //     status: "inactive",
      //     createdAt: { $lte: fifteenMinutesAgo },
      //   },
      //   {
      //     $set: {
      //       status: "active",
      //     },
      //   }
      // );
      // if (result.modifiedCount > 0) {
      //   console.log(`total user ${result.modifiedCount} has been activated.`);
      // }
      const users = await User.find({
        status: "inactive",
        createdAt: { $lte: fifteenMinutesAgo },
        emailSent: false,
      });
      for (const user of users) {
        user.status = "active";
        user.emailSent = true;
        await user.save();
        await sendActivationMail(user.email, user.fullName);
        console.log(`Activation email sent to ${user.email}`);
      }
      if (users.length >= 0) {
        console.log(`Total users activated: ${users.length}`);
      }
    } catch (err: any) {
      console.log("Error while creating crone job", err);
    }
  });
};
