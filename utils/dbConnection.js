import mongoose from "mongoose";

const connection = {};

const dbConnection = async () => {
  if (connection.isConnected) return;

  const db = await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export default dbConnection;
