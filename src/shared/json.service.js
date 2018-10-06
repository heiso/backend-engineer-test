const fs = require('fs')

function parseJsonFromFile (path) {
  if (!fs.existsSync(path)) throw new Error(`File ${path} does not exists`)

  const file = fs.readFileSync(path, 'utf8')

  try {
    return JSON.parse(file)
  } catch (err) {
    throw new Error(`File ${path} isn't a valid json file`)
  }
}

module.exports = {
  parseJsonFromFile
}
