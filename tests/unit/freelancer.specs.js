/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const { beforeHook, afterHook } = require('./shared/bootstrap')
const { Freelancer } = require('../../src/freelancer')
const fixture = require('./fixtures/freelancer.json')

describe('Freelancer', () => {
  before(() => beforeHook())
  after(() => afterHook())

  describe('constructor', () => {
    it('should throw an error if trying to instanciate without arguments', () => {
      expect(() => new Freelancer()).to.throw()
    })

    it('should create an instance of Freelancer', () => {
      const freelancer = new Freelancer(fixture)
      expect(freelancer).to.be.an.instanceOf(Freelancer)
    })
  })

  describe('instance', () => {
    beforeEach(() => {
      this.freelancer = new Freelancer(fixture)
    })

    it('should have a property skills', () => {
      expect(this.freelancer).to.have.property('skills')
    })
  })
})
