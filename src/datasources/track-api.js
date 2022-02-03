import { DataSource } from 'apollo-datasource';
import { UserInputError, AuthenticationError } from 'apollo-server';
import fetch from 'node-fetch';


export default class WatchlistDataSource extends DataSource {
  constructor() {
    super();
    this.connectionURL = 'https://bt-bxp-sapi-watchlist-item.us-w2.cloudhub.io/api/watchlistItems' // connectionURL;
    this.headers = {
      client_id: '966f624099be4c008b78082872cc8f86',
      client_secret: '952a3811a9d34004Abdc7387009b3FB4',
    };
  }

   async delete(watchlistIds) {
    const deleteRes = await fetch(`${this.connectionURL}?watchlistIds=${watchlistIds}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    const resJSON = await deleteRes.json();
    if (!deleteRes.ok) {
      if (deleteRes.status === 400) {
        throw new UserInputError(resJSON.message);
      } else if (deleteRes.status === 401) {
        throw new AuthenticationError(deleteRes.message);
      } else {
        throw new Error(resJSON.message);
      }
    }
    return resJSON;
  }
  
}