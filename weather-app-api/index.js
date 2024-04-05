const express = require('express')
const app = express()
const weather = require('./routes/weather')
const { save } = require('./data/generator')
const cron = require('node-cron')

app.use('/api/weather', weather)
cron.schedule('*/5 * * * *', save)
app.listen(3000, () => {
    console.log('The weather application is running succesfully...');
})
