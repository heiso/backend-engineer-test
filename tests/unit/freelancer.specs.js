/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const { beforeHook, afterHook } = require('./shared/bootstrap')
const { Freelancer } = require('../../src/freelancer')

describe('Freelancer', () => {
  before(() => beforeHook())
  after(() => afterHook())

  describe('constructor', () => {
    it('should create an instance of Freelancer', () => {
      const freelancer = new Freelancer()
      expect(freelancer).to.be.an.instanceOf(Freelancer)
    })
  })

  describe('instance', () => {
    beforeEach(() => {
      this.freelancer = new Freelancer()
    })

    it('should have a property skills', () => {
      expect(this.freelancer).to.have.property('skills')
    })
  })
})
