import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphalServer from "./graphql";

async function init() {
  const app = express();
  //Port inatialize
  const PORT = Number(process.env.PORT) || 8002;

  app.use(express.json());
  

  app.get("/", (req, res) => {
    res.json({ mag: "Welcome to GraphQL" });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphalServer()));

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}
init();
