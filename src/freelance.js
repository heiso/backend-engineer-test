const moment = require('moment')
const assert = require('assert')

class Freelance {
  static setMonthsFromInterval (startDate, endDate, monthsSet) {
    const start = moment(startDate)
    const end = moment(endDate)

    // Round endDate to the nearest end of month to get a correct interval with a month granularity
    end.subtract(end.daysInMonth() / 2, 'days').endOf('month')

    const currentMonth = start.clone()
    /* eslint-disable no-unmodified-loop-condition */
    while (currentMonth < end) {
      monthsSet.add(currentMonth.format('YYYY-MM'))
      currentMonth.add(1, 'month')
    }
  }

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
        Freelance.setMonthsFromInterval(startDate, endDate, monthsBySkills[skill.id])
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
