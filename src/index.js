const fs = require('fs')
const { Freelancer } = require('./freelancer')

const FILE_PATH = './exercise/freelancer.json'

function getJson () {
  if (!fs.existsSync(FILE_PATH)) throw new Error(`File ${FILE_PATH} does not exists`)

  const file = fs.readFileSync(FILE_PATH, 'utf8')

  try {
    return JSON.parse(file)
  } catch (err) {
    throw new Error(`File ${FILE_PATH} isn't a valid json file`)
  }
}

try {
  const freelancer = new Freelancer(getJson())
  console.log(freelancer.skills)
} catch (err) {
  console.log(err)
  process.exit(1)
}
