// src/server.ts
import app from "./app";
import { connectDB } from "./config/database";
import { userActivation } from "./utils/task";

const PORT: string | number = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    userActivation(); // only run in actual server, not in tests
  })
  .catch((err: any) => {
    console.log(`Can't connect to database : ${err}`);
  });
