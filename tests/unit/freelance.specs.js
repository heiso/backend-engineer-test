/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const { beforeHook, afterHook } = require('./shared/bootstrap')
const { Freelance } = require('../../src/freelance')
const input = require('./fixtures/freelance.input.json')
const expected = require('./fixtures/freelance.expected.json')

describe('Freelance', () => {
  before(() => beforeHook())
  after(() => afterHook())

  describe('constructor', () => {
    it('should throw an error if trying to instanciate without arguments', () => {
      expect(() => new Freelance()).to.throw()
    })

    it('should create an instance of Freelance', () => {
      const freelance = new Freelance(input)
      expect(freelance).to.be.an.instanceOf(Freelance)
    })
  })

  describe('getComputedSkills', () => {
    it('should return an aggregation of experience\'s months by skill', () => {
      const computedSkills = Freelance.getComputedSkills(input.freelance.professionalExperiences)
      expect(computedSkills).to.have.deep.members(expected.freelance.computedSkills)
    })
  })

  describe('instance', () => {
    beforeEach(() => {
      this.freelance = new Freelance(input)
    })

    it('should have a property id', () => {
      expect(this.freelance).to.have.property('id').that.equals(expected.freelance.id)
    })

    it('should have a property skills', () => {
      expect(this.freelance).to.have.property('computedSkills').which.has.deep.members(expected.freelance.computedSkills)
    })
  })
})
