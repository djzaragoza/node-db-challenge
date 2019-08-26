const express = require('express');

const db = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await
        db.getProjects();
            res.status(200).json({ success: true, projects});
    }
    .catch(err) {
        res.status(500).json({ success: false, error: 'There was an error while retrieving the projects'});
    }
});

router.post('/', async (req, res) => {
    const project = req.body;

    try {
        const projects = await
        db.addProject(project);
            res.status(201).json({ success: true, projects });
    } catch (err) {
        res.status(500).json({ success: false, error: 'There was an error while adding the project '});
    }
});

router.get('/:id/resources', async (req, res) => {
    const {id} = req.params;

    try {
        const resources = await
        db.getResources(id);
        if (resources) {
            res.status(200).json({ success: true, resources })
        } else {
            res.status(404).json({ success: false, error: `Could not find project with id ${id}`});
        }
    }   catch (err) {
            res.status(500).json({ success: false, error: 'There was an error while retrieving the resources' });
    }
});

// adding a resource

router.get('/:id/tasks', async (req, res) => {
    const {id} = req.params;

    try {
        const tasks = await
        db.getTasks(id);
        if (tasks) {
            res.status(200).json({ success: true, tasks });
        } else {
            res.status(404).json({ success: false, error: `Could not find project with id ${id} `});
        }
    }   catch(err) {
            res.status(500).json({ success: false, error: 'There was an error while retrieving the tasks '});
    }
});

// adding a task 

module.exports = router;