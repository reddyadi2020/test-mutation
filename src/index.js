import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers.js';
import WatchlistDataSource from './datasources/track-api.js';
import { readFileSync } from 'fs';


const graphql = readFileSync('./src/watchgraphql').toString();

const typeDefs = gql`
  ${graphql}
`;

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        watchlistDataSource: new WatchlistDataSource(),
      };
    },
  });

  const { url, port } = await server.listen({port: process.env.PORT || 4000});
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
