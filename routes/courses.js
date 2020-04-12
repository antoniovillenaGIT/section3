const express = require('express');
const router = express.Router();

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]

router.get('/', (req, res) => {
    res.send(courses);
})

router.post('/', (req, res) => {
    console.log("post request");

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = validateCourse(req.body);

    if (result.error) {
        // Bad result STATUS 400
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.get('/:courseId', (req, res) => {
    console.log("get request");

    const course = courses.find( c => c.id === parseInt(req.params.courseId));
    if (!course) {
        // course dont exist - return 404
        res.status(404).send('the course for the given id was not found');
        return;
    } else {
        res.send(course);
    }
});

router.put('/:courseId', (req, res) => {
    console.log("put request");

    // Lookup de course
    // if not existing return 404
    const course = courses.find( c => c.id === parseInt(req.params.courseId));

    if (!course) {
        console.log("course not found");
        // course dont exist - return 404
        res.status(404).send('the course for the given id was not found');
        return;
    }

    // Validate
    // If invalid send 400 error
    const result = validateCourse(req.body);

    if (result.error) {
        // Bad result STATUS 400
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update the course
    // return the updated course
    course.name = req.body.name;

    // send the updated course info back
    res.send(course);
});

router.delete('/:courseId', (req, res) => {
    console.log("delete request");

    // Lookup de course
    // if not existing return 404
    const course = courses.find( c => c.id === parseInt(req.params.courseId));

    if (!course) {
        console.log("course not found");
        // course dont exist - return 404
        res.status(404).send('the course for the given id was not found');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;