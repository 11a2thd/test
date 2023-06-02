const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
const db = require('./config/db')

db.connect()

const route = require('./routes')

app.use(express.urlencoded())
app.use(express.json())



app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

app.use(methodOverride('_method'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      multiply: (a, b) => a * b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(cookieParser());

route(app)

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
