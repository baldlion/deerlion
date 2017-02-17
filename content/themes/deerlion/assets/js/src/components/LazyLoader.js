import throttle from 'lodash/throttle';
import { isElementInView } from '../lib/utilities';
import inViewport from 'in-viewport';
import dispatcher from '../dispatcher';
import actions from '../actions';
import verge from 'verge';

export default class LazyLoader {
  constructor(selector) {
    this.selector = selector;
    this.instances = [];


    window.addEventListener('scroll', () => {
      throttle(this.query.bind(this), 2500)();
    });

    dispatcher.subscribe(actions.POSTS_CHANGED, this.render.bind(this));
    this.render();
  }

  render() {
    let $elements = document.querySelectorAll(this.selector);

    [...$elements].forEach($element => {
      this.add($element);
    });

    this.query();
  }

  add($element) {
    let instance;

    if ($element.hasAttribute('lazy-element')) {
      return;
    }

    if ($element instanceof HTMLImageElement) {

    } else {
      instance = new LazyBackground($element);
    }

    this.instances.push(instance);
  }

  query() {
    this.instances.forEach(instance => {
      if (!instance.isLoaded && verge.inViewport(instance.$element, 50)) {
        instance.load();
      }
    });
  }
}

class LazyElement {
  constructor($element) {
    this.$element = $element;
    this.src = this.$element.getAttribute('data-lazy-load');
    this.isLoaded = false;
    this.$element.style.opacity = 0;
  }
}

class LazyBackground extends LazyElement {
  constructor($element) {
    super($element);

    this.$element.setAttribute('lazy-element', '');
  }

  load() {
    if (!this.isLoaded) {
      let image = new Image();

      image.onload = this.handleImageLoad.bind(this);
      image.src = this.src;
      this.$element.style.opacity = 1;
      this.isLoaded = false;
    }
  }

  handleImageLoad(event) {
    this.isLoaded = true;

    this.$element.style.backgroundImage = `url(${this.src})`;
  }
}