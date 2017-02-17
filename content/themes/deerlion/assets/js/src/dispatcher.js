class Dispatcher {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    let index;

    if (!this.events[event]) {
      this.events[event] = [];
    }

    index = this.events[event].push(callback) - 1;

    return {
      unsubscribe: function () {
        delete this.events[event][index];
      }
    }

  }

  unsubscribe(event, callback) {

  }

  publish(event, data) {
    if (!this.events[event] || this.events[event].length === 0) {
      return;
    }

    this.events[event].forEach(callack => {
      callack(data || {});
    });
  }
}

export default new Dispatcher();