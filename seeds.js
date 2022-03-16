const mongoose = require('mongoose');
const Resume = require('./models/resume');

mongoose.connect('mongodb://localhost:27017/resumePage')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
})

// const p = new Resume({
//     name: 'Sahil Gupta',
//     dob: 14-03-2002,
//     email: 'shailxgupta02@gmail.com',
//     education: 'graduate',
//     experience: 0,
//     skills: 'programmer'
// })

// p.save().then(p => {
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })

const seedResumes = [
    {
        name: 'Yash Sharma',
        dob: '17-04-2001',
        email: 'yashprakashsharma2000@gmail.com',
        education: 'under-graduate',
        experience: 0,
        skills: 'developer'
    },
    {
        name: 'Vishal Goyal',
        dob: '25-08-2000',
        email: 'vgoyal.108@gmail.com',
        education: 'under-graduate',
        experience: 0,
        skills: 'data-analyst'
    }
]

Resume.insertMany(seedResumes)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})