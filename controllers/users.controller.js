const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require('../models/user')

const usersGet = async (req, res = response) => {
    const  { limit = 5, desde = 0 } = req.query;

    const condition = {state: true}

    // const users = await User.find(condition)
    //     .skip( parseInt(desde)) 
    //     .limit(parseInt(limit));

    // const total = await User.countDocuments(condition);

    const [total, users] = await  Promise.all([
        User.countDocuments(condition),
        User.find(condition)
        .skip( parseInt(desde)) 
        .limit(parseInt(limit)),

    ])

    res.json({
        // respuesta
        total,
        users
    });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role} = req.body;

    const user = new User({name, email, password, role});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}
const usersPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, ...rest} = req.body;

    //TODO validar contra base de datos
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await User.findByIdAndUpdate(id, rest);

    res.json({
        userDB
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controlador'
    });
}

const usersDelete = async (req, res = response) => {
    const id = req.params.id;

    /* Borrar el usuario fisicamente */
    // const user = await User.findByIdAndDelete(id);

    /* Cambiamos el estado del usuario para no mostrarlo */
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        user
    });
}


module.exports = {
    usersGet,
    usersPost, 
    usersPut, 
    usersPatch,
    usersDelete
}