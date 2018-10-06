const { Freelance } = require('./freelance')
const { parseJsonFromFile } = require('./shared/json.service')

const FILE_PATH = './exercise/freelance.json'

try {
  const freelance = new Freelance(parseJsonFromFile(FILE_PATH))
  console.log(freelance)
} catch (err) {
  process.exit(1)
}
