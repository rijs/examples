const { update, emitterify, str, values, keys, extend } = require('utilise/pure')
    , log = require('utilise/log')('[blotter]')
    , { stream, az, transform } = require('../../utils/stream')
    , sample = arr => arr[number(arr.length)]
    , { random, pow } = Math
    , G4 = ['EURUSD', 'USDJPY', 'GBPUSD', 'USDCHF']
    , directions = ['Buy', 'Sell', 'Two-Way']
    , accounts = Array(100).fill().map((d, i) => `Account ${i}`)
    , number = (digits, precision = 0) => ~~(random()*digits) / pow(10, precision)
    , views = {}

const loaded = (ripple, { body }) => {
  const interval = setInterval(() => {
    const id = number(10000000)
        , { length } = values(body)

    log('creating'.magenta, id)
    update(id, { 
      index: length
    , id
    , ccypair: sample(G4)
    , dealtccy: 'USD'
    , account: sample(accounts)
    , status: 'ACTIVE'
    , direction: sample(directions)
    , notional: number(1000000000)
    , tenor: 'SPOT'
    , rate: number(1000000, 5)
    , last_updated: new Date()
    })(body)

    if (length == 100) 
      clearInterval(interval)
  }, 100)

  setInterval(() => {
    for (let id in body) {
      update(`${id}.rate`, number(1000000, 5))(body)
      update(`${id}.last_updated`, new Date())(body)
    }
  }, 100 + number(100))

  views.az = az('index')(body)
}

const from = (req, res) =>
  req.data.type == 'ACTIVE' ? active(req.data.value) 
: req.data.type == 'MAX'    ? max()
                            : false

const active = ({ offset, length }) => stream(
  transform
    (d => offset + length > d.length
      ? d.slice(-length).map(d => d.id)
      : d.slice(offset, offset+length).map(d => d.id)
    )
    (views.az)
)

const max = () => stream(
  transform
    (d => ({ length: d.length }))
    (views.az)
)

module.exports = { 
  name: 'trades'
, body: []
, headers: {
    loaded
  , from
  , cache: 'no-store'
  }
}