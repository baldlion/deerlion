import store from '../store';

export default class Post {
  constructor($image) {
    this.$content = $image.querySelector('[data-post-content]');

    this.renderImages();
  }

  renderImages() {
    let $images = this.$content.querySelectorAll('img');

    $images.forEach($image => {
      let $parent = $image.parentNode;

      $parent.classList.add('post-image');
    });

  }
}