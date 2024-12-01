import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./db/connection";
import groceryRoutes from "./routes/groceryRoutes/groceries.routes";
import authRoutes from "./routes/authRoutes/auth.routes";
import orderRoutes from "./routes/orderRoutes/orders.routes";
import profileRoutes from "./routes/authRoutes/profile.routes";
import { authenticateJWT } from "./utils/middlewares/Jwt.middleware";

const PORT = 5555;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/grocery", authenticateJWT, groceryRoutes);
app.use("/api/v1/orders", authenticateJWT, orderRoutes);
app.use("/api/v1/profile", authenticateJWT, profileRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
