class Freelancer {
  constructor (raw) {
    if (!raw) throw new Error('[raw] argument is mandatory')
    this._raw = raw
  }

  get skills () {
    return {}
  }
}

module.exports = {
  Freelancer
}
