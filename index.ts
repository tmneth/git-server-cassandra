import express, { Express } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users";
import repositoryRoutes from "./routes/repositories";

const app: Express = express();
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/repositories", repositoryRoutes);

const PORT: number = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
