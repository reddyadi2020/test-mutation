export default {
  Mutation: {
        removeWatchlistItem: async (_, { watchlistItemId }, { dataSources }) => {
      await dataSources.watchlistDataSource.delete(watchlistItemId);
      // If the request failed an error will be thrown in the delete method
      return true;
    },
},
};