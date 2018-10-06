/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const moment = require('moment')
const { beforeHook, afterHook } = require('./shared/bootstrap')
const { roundToMonth, setMonthsSetFromInterval } = require('../../src/shared/date.service')

describe('Date service', () => {
  before(() => beforeHook())
  after(() => afterHook())

  describe('roundToMonth', () => {
    it('should return a date rounded to the nearest month', () => {
      const dateStartOfMonth = moment('2018-03-06T19:45:53')
      roundToMonth(dateStartOfMonth)
      expect(dateStartOfMonth.format('YYYY-MM-DD HH:mm:ss')).to.equal('2018-03-01 00:00:00')

      const dateEndOfMonth = moment('2018-03-29T19:45:53')
      roundToMonth(dateEndOfMonth)
      expect(dateEndOfMonth.format('YYYY-MM-DD HH:mm:ss')).to.equal('2018-04-01 00:00:00')
    })
  })

  describe('setMonthsSetFromInterval', () => {
    it('should store months for a given time interval in a given Set', () => {
      const months = new Set()
      const start = moment('2018-02-20T18:45:53')
      const end = moment('2018-10-01T02:45:53')
      setMonthsSetFromInterval(start, end, months)
      expect(months.size).to.equal(7)
      expect(months.has('2018-03')).to.be.true
      expect(months.has('2018-09')).to.be.true
    })
  })
})
