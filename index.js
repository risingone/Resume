const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Resume = require('./models/resume');

mongoose.connect('mongodb://localhost:27017/resumePage')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.get('/resumes', async (req, res) => {
    const { skills } = req.query;
    if(skills){
        //console.log(skill)
        const resumes = await Resume.find({ skills })
        //c onsole.log(resumes)
        res.render('resumes/index', { resumes, skills })
    } else{
        const resumes = await Resume.find({})
        res.render('resumes/index', { resumes, skills: 'All' })
    }
    // const resumes = await Resume.find({})
    // console.log(resumes)
})

app.get('/resumes/new', (req, res) => {
    res.render('resumes/new')
})

app.post('/resumes', async (req,res) => {
    const newResume = new Resume(req.body);
    await newResume.save();
    console.log(newResume)
    res.redirect(`/resumes/${newResume._id}`)
})

app.get('/resumes/:id', async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findById(id)
    //console.log(resume)
    res.render('resumes/show', { resume })
})

app.get('/resumes/:id/edit', async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    res.render('resumes/edit', { resume })
})

app.put('/resumes/:id', async (req, res)=> {
    const { id } = req.params;
    const resume = await Resume.findByIdAndUpdate(id, req.body, {runValidators: true, new: true });
    res.redirect(`/resumes/${resume._id}`);
})

app.delete('/resumes/:id', async (req, res) => {
    const { id } = req.params;
    const deletedResume =  await Resume.findByIdAndDelete(id);
    res.redirect('/resumes');
})

app.listen(3000, () =>{
    console.log("APP IS LISTENING ON PORT 3000!");
})