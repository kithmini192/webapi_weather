const express = require('express')
const router = express.Router()

const { find } = require('../data/generator')

router.get('/find', async (req, res) => {
    const data = await find()
    res.json(data)
})


module.exports = router