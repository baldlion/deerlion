import LazyLoader from './LazyLoader';
import Pagination from './Pagination';
import Post from './Post';
import Journal from './Journal';

export default class App {
  constructor() {

    let $loadMore = document.querySelector('[data-load-more]');
    let $loopPosts = document.querySelector('[data-loop-posts]');
    let $post = document.querySelector('[data-post]');
    let $journal = document.querySelector('[data-journal]');
    let pageLimit = 4;
    this.lazyLoader = new LazyLoader('[data-lazy-load]');

    if ($loopPosts) {
      this.pagination = new Pagination($loopPosts, pageLimit);
    }

    if ($loadMore) {
      $loadMore.addEventListener('click', event => {
        this.handleLoadMore(event, $loadMore)
      });
    }

    if ($post) {
      this.post = new Post($post);
    }

    if ($journal) {
      this.journal = new Journal($journal);
    }
  }

  handleLoadMore(event, $element) {
    if (event) {
      event.preventDefault();
    }

    this.pagination.next(() => {
      let state = this.pagination.state;

      // show/hide pagination button
      if (state && (state.total <= (state.page * state.limit))) {
        $element.style.opacity = 0;
      } else {
        $element.style.opacity = 1;
      }
    });
  }
}