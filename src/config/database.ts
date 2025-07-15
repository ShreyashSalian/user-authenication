import mongoose from "mongoose";
import { AddUserFromList } from "../utils/addAdmin";
import { userActivation } from "../utils/task";
AddUserFromList;

export const connectDB = async (): Promise<void> => {
  try {
    const DB =
      process.env.NODE_ENV === "production"
        ? `${process.env.LOCAL_PATH}/${process.env.DATABASE_NAME}` // To connect to local server mongod compass
        : `${process.env.LIVE_PATH}/${process.env.DATABASE_NAME}`; // for connect to mongod atlas
    const connection = await mongoose.connect(
      // `${process.env.DOCKER_PATH}/${process.env.DATABASE_NAME}` //To run using the docker
      DB
    );
    console.log(`Connected to the Database : ${connection.connection.host}`);
    await AddUserFromList();
    // await userActivation();
  } catch (err: any) {
    console.log(`Error while connecting to database ::: ${err}`);
    process.exit(1);
  }
};
