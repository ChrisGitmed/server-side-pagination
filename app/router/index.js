const router = require('./router')
const path = require('path')
const fs = require('fs')

// Health check
router.get('/v1/healthcheck', async (req, res, next) => {
  res.status(200).send(`<img src ='https://http.cat/200.jpg'/>`)
})

const getDirectories = path => {
  return fs.readdirSync(path, { withFileTypes: true }).filter(file => file.isDirectory()).map(dir => dir.name);
}

const basePath = path.join(__dirname, '../components');
const cleanDirectories = getDirectories(basePath).filter(d => d !== 'template')

// Automatically load all "routes" files found under their respective component folders
cleanDirectories.forEach(componentName => {
  // REQUIRE ROUTES
  let routesPath = `${basePath}/${componentName}/routes.js`
  if (fs.existsSync(routesPath)) require(routesPath)
  // REQUIRE ADMIN ROUTES
  let adminsPath = `${basePath}/${componentName}/admin.routes.js`
  if (fs.existsSync(adminsPath)) require(adminsPath)
})

module.exports = router
