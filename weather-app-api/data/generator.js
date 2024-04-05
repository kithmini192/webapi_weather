const { MongoClient } = require('mongodb')
const districts = require('./district');

const url = "mongodb://localhost:27017"; 
const client = new MongoClient(url)

async function connection() {
    try {
        await client.db('weatherdb').command({ ping: 1 });
        console.log('mongodb connected...');
    } catch {
        console.log('connection unsuccesful...');
    } finally {
        await client.close()
    }
}

async function save() {
    try {
        const db = client.db('weatherdb')
        const collection = db.collection('weather')
        const docs = create()
        const result = await collection.insertMany(docs)
        console.log('date saved successfully...');
    } catch {
        console.log('cannot save data...');
    } finally {
        await client.close()
    }
}

async function find() {
    try {
        await client.connect()

        const db = client.db('weatherdb')
        const collection = db.collection('weather')
        const result = await collection.find().toArray()
        return result
    } catch {
        console.log('server error...');
    } finally {
        await client.close()
    }
}

function create() {
    let docs = []

    const date = new Date()

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    districts.map(district => {
        let doc = {
            district: district,
            temperature: Math.floor(Math.random() * (30 - 20 + 1) + 20),
            humidity: Math.floor(Math.random() * (90 - 60 + 1) + 60),
            airpressure: Math.floor(Math.random() * (1500 - 1000 + 1) + 1000),
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}:${seconds}`,
            created: date
        }
        docs.push(doc)
    })

    return docs
}

module.exports = { connection, save, find };