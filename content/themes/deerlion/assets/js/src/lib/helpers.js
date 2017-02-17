import Handlebars from 'handlebars/runtime';
import downsize from 'downsize';
import pick from 'lodash/pick';
import moment from 'moment';

Handlebars.registerHelper('excerpt', (options) => {
  let truncateOptions = options.hash || {};
  let html = options.data.root.html;
  let excerpt = html.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
  excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
  excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
  excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');
  truncateOptions = pick(truncateOptions, ['words', 'characters']);

  return new Handlebars.SafeString(downsize(excerpt, truncateOptions));
});

Handlebars.registerHelper('date', (options) => {
  let format = options.hash.format || 'MMM DD, YYYY';
  let date = moment(options.data.root.date).format(format);

  return new Handlebars.SafeString(date);
});

Handlebars.registerHelper('lazy', (options) => {
  console.log(options);

  return 'asdf';
});