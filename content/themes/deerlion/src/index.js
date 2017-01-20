import axios from 'axios';

axios.get(ghost.url.api('posts', {
    limit: '4'
  }))
  .then((res) => {
    // console.log(res);
  });