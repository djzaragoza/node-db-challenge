const db = require('../data/db-config');

module.exports = {
    getProjects,
    getResources,
    getTasks,
    addProject,
    addResource,
    addTask
}

function getProjects() {
    return db('projects');
};

function getResources(projet_id) {
    return db('projects as p')
        .join('projects_resources as pr', 'p.id', 'pr.project_id')
        .join('resources as r', 'pr.resource_id', 'r.id')
        .select('resource.name', 'resource.description')
        .where({project_id});
};

function getTasks(project_id) {
    return db('proejcts as p')
        .join('tasks as t', 'p.id', 't.project_id')
        .select('t.description', 't.notes', 't.completed')
        .where({project_id});
};

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => ids[0]);
};

function addResource(resource) {
    return db('')
        .insert(resource)
        .then(ids => ids[0]);
};

function addTask(task) {
    return db('tasks')
        .insert(task)
        .then(ids => ids[0]);
};