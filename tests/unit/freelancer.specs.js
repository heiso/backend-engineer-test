/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const { beforeHook, afterHook } = require('./shared/bootstrap')
const { Freelancer } = require('../../src/freelancer')
const input = require('./fixtures/freelancer.input.json')
const expected = require('./fixtures/freelancer.expected.json')

describe('Freelancer', () => {
  before(() => beforeHook())
  after(() => afterHook())

  describe('constructor', () => {
    it('should throw an error if trying to instanciate without arguments', () => {
      expect(() => new Freelancer()).to.throw()
    })

    it('should create an instance of Freelancer', () => {
      const freelancer = new Freelancer(input)
      expect(freelancer).to.be.an.instanceOf(Freelancer)
    })
  })

  describe('instance', () => {
    beforeEach(() => {
      this.freelancer = new Freelancer(input)
    })

    it('should have a property skills', () => {
      expect(this.freelancer).to.have.property('skills')
    })

    it('should have a property skills which is an aggregation of month of experience by skill', () => {
      expect(this.freelancer.skills).to.equal(expected.freelance.computedSkills)
    })
  })
})
