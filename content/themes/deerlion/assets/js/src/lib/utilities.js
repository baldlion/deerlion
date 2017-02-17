const isElementInView = function($element, fullyInView = false) {
  let pageTop = (window.pageYOffset) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  let pageBottom = (window.innerHeight || document.documentElement.clientHeight);
  let elementRect = $element.getBoundingClientRect();
  let elementTop = elementRect.top;
  let elementBottom = elementRect.bottom;

  if (fullyInView) {
    return ((pageTop < elementTop) && (pageBottom > elementBottom));
  } else {
    return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
  }
};

export {
  isElementInView
};