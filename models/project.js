const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
    project_name: String,
    description: String,
    author: String,
    type: String,
    createdOn: String
});


const project = mongoose.model('project', ProjectSchema);

module.exports = project;
