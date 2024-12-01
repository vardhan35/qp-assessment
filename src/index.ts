import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./db/connection";
import groceryRoutes from "./routes/groceryRoutes/index.routes";
import authRoutes from "./routes/authRoutes/auth.routes";
import orderRoutes from "./routes/orderRoutes/index.routes";

const PORT = 5555;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/grocery", groceryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
