const fs = require('fs')
const { Freelancer } = require('./freelancer')

const FILE_PATH = './exercise/freelancer.json'

function getJson (path) {
  if (!fs.existsSync(path)) throw new Error(`File ${path} does not exists`)

  const file = fs.readFileSync(path, 'utf8')

  try {
    return JSON.parse(file)
  } catch (err) {
    throw new Error(`File ${path} isn't a valid json file`)
  }
}

try {
  const freelancer = new Freelancer(getJson(FILE_PATH))
  console.log(freelancer.skills)
} catch (err) {
  console.log(err)
  process.exit(1)
}
