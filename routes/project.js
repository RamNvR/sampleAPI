const router = require('express').Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    project_name: String,
    description: String,
    author: String,
    type: String,
    createdOn: String
});
const Project = mongoose.model('project', ProjectSchema);
const { celebrate, Joi, errors } = require('celebrate');

router.post('/createProject', celebrate({
    body: Joi.object().keys({
        project_name: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        type: Joi.string().default('type1'),
        createdOn: Joi.string().required()
    })
}), errors(), (req, res) => {
    let payload = req.body;
    payload.author = req.get('Authorization');
    let project = new Project(payload);
    project.save().then(result => {
        console.log(result);
        res.status(200).json({
            status: 200
        });
    });
});

router.get('/listProjects', (_req, res) => {
    let author = req.get('Authorization');
    Project.find({ "author": author }, (err, docs) => {
        if (err) res.status(500).json({
            status: 500
        });
        console.log(docs);
        res.status(200).json({
            result: docs,
            status: 200
        });
    });
});

router.delete('/delete', celebrate({
    query: Joi.object().keys({
        id: Joi.string().min(10).required()
    })
}), errors(), (req, res) => {
    Project.remove({ "_id": req.query.id }, (err, result) => {
        if (err) res.status(500).json({ status: 500 });
        console.log(result);
        res.status(200).json({ status: 200 });
    });
})

router.post('/updateProject', celebrate({
    body: Joi.object().keys({
        id: Joi.string().required(),
        project_name: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        type: Joi.string().default('type1'),
        createdOn: Joi.string().required()
    })
}), (req, res) => {
    let payload = req.body;
    Project.updateOne({ "_id": payload.id }, payload, (err, doc) => {
        if (err) res.status(500).json({ status: 500 });
        console.log(doc);
        res.status(200).json({
            result: doc,
            status: 200
        });
    });
});

module.exports = router;
