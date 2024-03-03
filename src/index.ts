import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  //Port inatialize
  const PORT = Number(process.env.PORT) || 8002;

  app.use(express.json());
  // Create Graphql Server
  const gqlserver = new ApolloServer({
    // Schema layer
    typeDefs: `
    type Query {
        hello: String
        say(name: String): String
    }
    `, 
    // Actual functions which runs
    resolvers: {
        Query: {
            hello: () => `Hey there, I am from Graphql server`,
            say: (_, {name}: {name: string}) => `Hey ${name}, How are you?`,
        },

    }, 
  });

  // Start the  gql Server
  await gqlserver.start();

  app.get("/", (req, res) => {
    res.json({ mag: "Welcome to GraphQL" });
  });

  app.use("/graphql", expressMiddleware(gqlserver))

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}
init();
