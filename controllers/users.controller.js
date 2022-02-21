const { response } = require("express");


const usersGet = (req, res = response) => {
    const query = req.query;
    console.log(query);
    res.json({
        msg: 'get API - Controlador'
    });
}

const usersPost = (req, res = response) => {
    const { name, age } = req.body;

    res.json({
        msg: 'Post API - Controlador',
        name,
        age
    });
}
const usersPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Put API - Controlador', 
        id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controlador'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controlador'
    });
}


module.exports = {
    usersGet,
    usersPost, 
    usersPut, 
    usersPatch,
    usersDelete
}