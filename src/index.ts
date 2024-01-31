import express from "express";
import connectDB from "./config/database";
import apiRoutes from "./routes/api";

const app = express();
app.use(express.json());

connectDB();

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));