const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
app.use(express.json());

const projects = [];

app.get('/projects', (req, res) => {
    const { title } = req.query;

    const results = title ? 
    projects.filter(project => project.title.includes(title)) 
    : projects

    return res.json(results);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;
    const project = { id: uuid(), title, owner };
    projects.push(project);
    return res.json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;
    
    const projectIndex = projects.findIndex(findProject => findProject.id === id);

    const project = { id, title, owner };
    projects[projectIndex] = project;

    if(projectIndex < 0) { // se não encontrou o índice
        return res.status(400).json({
            error: "Couldn't update project"
        });
    } 

    return res.json(project);

});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(findProject => findProject.id === id);

    
    if(projectIndex < 0) { // se não encontrou o índice
        return res.status(400).json({
            error: "Couldn't delete project"
        });
    } 

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});

app.listen(3333, () => {
    console.log('🌸 Server is running');
});


