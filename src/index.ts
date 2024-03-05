import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphalServer from "./graphql";
import UserService from "./services/user";

async function init() {
  const app = express();
  //Port inatialize
  const PORT = Number(process.env.PORT) || 8002;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ mag: "Welcome to GraphQL" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphalServer(), {
      context: async ({ req, res }) => {
        //@ts-ignore
        const token = req.headers['token']
        try {
          const user = UserService.decodeJWTToken(token as string);
          return {user}
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}
init();
