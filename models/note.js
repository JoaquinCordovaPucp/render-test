const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDb:', error.message)
    })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedDocument)=> {
        returnedDocument.id = returnedDocument._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v 
    }
})

module.exports = mongoose.model('Note', noteSchema)
