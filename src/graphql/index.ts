import { ApolloServer } from "@apollo/server";
import { User } from "./user";
async function createApolloGraphalServer() {
  // Create Graphql Server
  const gqlserver = new ApolloServer({
    // Schema layer
    typeDefs: `
      ${User.typeDefs}
    type Query {
       ${User.queries}
    }
    type Mutation {
        ${User.mutations}
    }
    `,
    // Actual functions which runs
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  // Start the  gql Server
  await gqlserver.start();

  return gqlserver;
}

export default createApolloGraphalServer;
