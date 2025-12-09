const mongoose = require('mongoose')

if( process.argv.length < 3) {
    console.log('give password as a value')
    process.exit(1)
}


const password = process.argv[2]


const url  = `mongodb+srv://a20243038:${password}@cluster0.rzzv57e.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`



mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)


// const note = new Note({
//     content: 'Tomorrow is sunday', 
//     important: false,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })


Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})