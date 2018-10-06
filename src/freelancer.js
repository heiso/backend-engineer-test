const moment = require('moment')

class Freelancer {
  constructor (raw) {
    if (!raw) throw new Error('[raw] argument is mandatory')
    this._raw = raw
  }

  get skills () {
    if (!this._raw.freelance || !this._raw.freelance.professionalExperiences) return []

    const { professionalExperiences } = this._raw.freelance

    const computedSkills = {}

    const monthsBySkills = professionalExperiences.reduce((acc, { skills = [] }) => {
      skills.forEach((skill) => {
        acc[skill.id] = new Set()
      })
      return acc
    }, {})

    for (const { startDate, endDate, skills = [] } of professionalExperiences) {
      for (const skill of skills) {
        computedSkills[skill.id] = skill

        const start = moment(startDate)
        const end = moment(endDate)
        let month = start.clone()
        while (month < end) {
          monthsBySkills[skill.id].add(month.format('YYYY-MM'))
          month = month.add(1, 'month')
        }
      }
    }

    return Object.values(computedSkills).map((computedSkill) => {
      return {
        ...computedSkill,
        durationInMonths: monthsBySkills[computedSkill.id].size - 1
      }
    })
  }
}

module.exports = {
  Freelancer
}
