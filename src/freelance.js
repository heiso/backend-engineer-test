const assert = require('assert')
const { setMonthsSetFromInterval } = require('./shared/date.service')

class Freelance {
  static getComputedSkills (professionalExperiences = []) {
    // Init a collection of month Sets (which will natively have a unique behavior)
    const monthsBySkills = professionalExperiences.reduce((acc, { skills = [] }) => {
      skills.forEach((skill) => {
        acc[skill.id] = new Set()
      })
      return acc
    }, {})

    // Prepare a collection of skills by skill id containing skill details
    const computedSkillsById = {}
    for (const { startDate, endDate, skills = [] } of professionalExperiences) {
      for (const skill of skills) {
        computedSkillsById[skill.id] = skill
        // Store number of months for this skill on this professionalExperiences time interval
        setMonthsSetFromInterval(startDate, endDate, monthsBySkills[skill.id])
      }
    }

    // Merge monthsBySkills and computedSkillsById and return computedSkills
    return Object.values(computedSkillsById)
      .map((computedSkill) => ({
        ...computedSkill,
        durationInMonths: monthsBySkills[computedSkill.id].size
      }))
  }

  constructor (raw) {
    assert(raw, '[raw] argument is mandatory')
    assert(raw.freelance, '[raw] should have a freelance property')

    this.id = raw.freelance.id
    this.computedSkills = Freelance.getComputedSkills(raw.freelance.professionalExperiences)
  }
}

module.exports = {
  Freelance
}
