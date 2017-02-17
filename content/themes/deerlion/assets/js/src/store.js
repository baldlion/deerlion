import axios from 'axios';
import dispatcher from './dispatcher';
import actions from './actions';

class Store {
  constructor() {

  }

  getPosts(page = 1, limit = 4) {
    return axios.get(ghost.url.api('posts', {
      page: page,
      limit: limit,
      include: 'author,tags'
    }));
  }

  getPost(slug) {
    return axios.get(ghost.url.api('posts', 'slug', slug, {
      include: 'author,tags'
    }));
  }

  getJournalPosts(page = 1, limit = 12) {
    return axios.get(ghost.url.api('posts', {
      page: page,
      limit: limit,
      filter: 'tag:journal'
    }));
  }
}

export default new Store();