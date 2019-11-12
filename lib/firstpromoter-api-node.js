const { promisify } = require('util');
const request = require('request');
const ip = require('ip');

class FirstpromoterApiNode {
  constructor(options = {}) {
    this.baseUrl = process.env.FIRSTPROMOTER_API_NODE_BASE_URL || 'https://firstpromoter.com/api/v1';
    this.setWid(
      process.env.FIRSTPROMOTER_API_NODE_WID
      || options.wid,
    );
    this.setKey(
      process.env.FIRSTPROMOTER_API_NODE_KEY
      || options.key,
    );
    this.request = promisify(request);
  }

  setWid(wid) {
    this.wid = wid;
  }

  setKey(key) {
    this.key = key;
  }

  get(path, params = {}) {
    return this.execute({
      path,
      method: 'get',
      qs: params,
    });
  }

  post(path, data) {
    return this.execute({
      path,
      method: 'post',
      json: data,
    });
  }

  put(path, data) {
    return this.execute({
      path,
      method: 'put',
      json: data,
    });
  }

  remove(path, data) {
    return this.execute({
      path,
      method: 'delete',
      json: data,
    });
  }

  execute(options) {
    return new Promise((resolve, reject) => {
      const { path, ...opts } = options;
      const json = typeof options.json === 'undefined' ? true : options.json;

      opts.url = `${this.baseUrl}/${path}`;

      if (typeof json === 'object' && options.path.match(/^track\//)) {
        json.wid = this.wid;

        if (!json.ip) {
          json.ip = ip.address();
        }

        if (json.ip === 'NO_IP') {
          delete json.ip;
        }
      }

      this.request({
        ...opts,
        json,
        headers: {
          'x-api-key': this.key,
        },
      }).then(
        result => FirstpromoterApiNode.processResponse(result, resolve, reject),
        err => reject(err),
      );
    });
  }

  static processResponse(result, resolve, reject) {
    if (result.statusCode === 200) {
      resolve(result);
    } else {
      reject(result.body || { message: 'API Error' });
    }
  }
}

module.exports = FirstpromoterApiNode;
