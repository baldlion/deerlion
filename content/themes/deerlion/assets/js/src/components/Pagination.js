import axios from 'axios';
import loopPost from '../../../../partials/loop-post.hbs';
import dispatcher from '../dispatcher';
import actions from '../actions';
import store from '../store';

export default class Pagination {
  constructor($element, limit) {
    this.limit = limit;
    this.currentPage = 0;
    this.$element = $element;
    this.state;

    this.next();
  }

  next(callback) {
    this.currentPage++;

    store.getPosts(this.currentPage, this.limit)
      .then(res => {
        let posts = res.data.posts;
        let meta = res.data.meta;

        this.state = meta.pagination;

        posts.forEach(this.render.bind(this));
        dispatcher.publish(actions.POSTS_CHANGED, null);

        if (callback) {
          callback();
        }
      });
  }

  render(post) {
    this.$element.innerHTML += loopPost({
      image: post.image,
      url: post.url,
      title: post.title,
      date: post.published_at,
      author: post.author,
      tags: post.tags,
      html: post.html
    });
  }
}