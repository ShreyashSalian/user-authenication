import { User } from "../models/user.model";
import { addUser } from "./userList";

export const AddUserFromList = async (): Promise<void> => {
  try {
    for (let user of addUser) {
      const userExit = await User.findOne({
        $or: [
          {
            userName: user.userName,
          },
          {
            email: user.email,
          },
        ],
      });
      if (!userExit) {
        const userCreation = await User.create({
          email: user.email,
          password: user.password,
          userName: user.fullName,
          contactNumber: user.contactNumber,
          role: user.role,
          fullName: user.fullName,
          gender: user.gender,
        });
        console.log(
          `User : ${user.fullName} has been added in to the database`
        );
      }
    }
  } catch (err: any) {
    console.log(err);
  }
};
