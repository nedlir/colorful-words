import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
