firstpromoter-api-node
==============

[![travis ci](https://travis-ci.org/FIRSTPROMOTER2/firstpromoter-api-node.svg?branch=master)](https://travis-ci.org/FIRSTPROMOTER2/firstpromoter-api-node)

Node.js FIRSTPROMOTER API bindings. API docs available here: https://FIRSTPROMOTER.com/api

### Installation

    npm install --save firstpromoter-api-node
    
## API

### `FirstpromoterApiNode(options)`

Creates a new `FirstpromoterApiNode` instance.

#### Arguments

- `options` - Optional - A plain JavaScript object that contains the configuration options.

#### Options

- `wid` - Optional (String) - Integration ID(wid): https://docs.firstpromoter.com/#authentication
- `key` - Required (Boolean) - API key

#### Return value

A `FirstpromoterApiNode` instance.

### Example of POST request

```js
const FirstpromoterApiNode = require('firstpromoter-api-node');

const firstpromoterApiNode = new FirstpromoterApiNode({
  key: 'YOUR_KEY',
  wid: 'YOUR_WID'
});

firstpromoterApiNode.post('track/signup', {
  email: 'example: email.com',
  tid: 'VISITOR_ID'
}).then(
  result => console.log(result),
  err => console.log(err)
);
```

#### Result

```json
{
  "id": 12345,
  "type": "signup",
  "amount_cents": null,
  "reward": null,
  "lead": {},
  "promoter": {}
}
```

