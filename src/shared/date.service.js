const moment = require('moment')

function roundToMonth (date) {
  if (date.date() > date.daysInMonth() / 2) date.add(1, 'month')
  date.startOf('month').startOf('day')
}

function setMonthsSetFromInterval (startDate, endDate, months = new Set()) {
  const start = (moment.isMoment(startDate)) ? startDate.clone() : moment(startDate)
  const end = (moment.isMoment(endDate)) ? endDate.clone() : moment(endDate)

  // Round start and end to the nearest month to get a correct interval with a month granularity even if timezone get involved
  roundToMonth(start)
  roundToMonth(end)

  const currentMonth = start.clone()
  /* eslint-disable no-unmodified-loop-condition */
  while (currentMonth < end) {
    months.add(currentMonth.format('YYYY-MM'))
    currentMonth.add(1, 'month')
  }

  return months
}

module.exports = {
  roundToMonth,
  setMonthsSetFromInterval
}
