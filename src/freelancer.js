class Freelancer {
  constructor (raw) {
    if (!raw) throw new Error('[raw] argument is mandatory')
    this._raw = raw
  }

  get skills () {
    if (!this._raw.freelance || !this._raw.freelance.professionalExperiences) return []
    const computedSkillsById = this._raw.freelance.professionalExperiences.reduce((acc, { startDate, endDate, skills = [] }) => {
      startDate = new Date(startDate)
      endDate = new Date(endDate)
      let durationInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12
      durationInMonths -= startDate.getMonth() + 1
      durationInMonths += endDate.getMonth()
      durationInMonths = (durationInMonths <= 0) ? 0 : durationInMonths

      for (const skill of skills) {
        acc[skill.id] = {
          ...skill,
          durationInMonths: (acc[skill.id]) ? acc[skill.id].durationInMonths + durationInMonths : durationInMonths
        }
      }
      return acc
    }, {})
    return Object.values(computedSkillsById)
  }
}

module.exports = {
  Freelancer
}
