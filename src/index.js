const fs = require('fs')
const { Freelance } = require('./freelance')

const FILE_PATH = './exercise/freelance.json'

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
  const freelance = new Freelance(getJson(FILE_PATH))
  console.log(freelance)
} catch (err) {
  console.log(err)
  process.exit(1)
}
