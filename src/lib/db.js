import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "\x1b[35m%s\x1b[0m",
      `✅ database is connected ${database.connection.host}`
    );
  } catch (error) {
    console.error(error);
  }
};
