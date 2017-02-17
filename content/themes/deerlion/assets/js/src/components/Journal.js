import store from '../store';
import actions from '../actions';
import dispatcher from '../dispatcher';
import journalPost from '../../../../partials/journal-post.hbs';
import journalSingle from '../../../../partials/journal-single.hbs';

export default class Journal {
  constructor($element) {
    this.$element = $element;
    this.$modal = this.createPostModal();
    this.posts = [];

    store.getJournalPosts().then(res => {
      this.posts = res.data.posts;

      this.posts.forEach(this.render.bind(this));
      dispatcher.publish(actions.POSTS_CHANGED, null);
    });
  }

  createPostModal() {
    let modal = document.createElement('div');
    modal.classList.add('journal__modal');

    document.body.appendChild(modal);

    return modal;
  }

  render(post) {
    let $posts;

    this.$element.innerHTML += journalPost({
      image: post.image,
      url: post.url,
      title: post.title,
      date: post.published_at,
      author: post.author,
      tags: post.tags,
      html: post.html
    });

    $posts = document.querySelectorAll('[data-journal-post]');

    [...$posts].forEach(this.renderPost.bind(this));
  }

  renderPost($post) {
    $post.addEventListener('click', event => {
      // event.stopPropagation();

      event.preventDefault();
      console.log(event.target, event);
      let post = this.getPostBySlug();
      this.handlePostClick(post);
    });
  }

  handlePostClick(post) {
    this.openPostModal(post);
  }

  openPostModal(post) {

    this.$modal.innerHTML = journalSingle({
      title: post.title
    });
  }

  getPostBySlug(slug) {
    let found = false;

    this.posts.some(post => {
      if (post.slug == slug) {
        found = post;
        return true;
      }
    });

    return found;
  }
}