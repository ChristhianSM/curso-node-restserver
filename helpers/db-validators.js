const Role = require('../models/role');
const User = require('../models/user')

const isRoleValid = async ( role = "") => {
    const existRole = await Role.findOne({ role });
    if ( !existRole ) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

//Verificar si el correo exite
const existEmail = async ( email = '' ) => {
    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El correo ${email}ya esta registrado`)
    }
}

//Verificar si existe el id a eliminar
const existUserById = async ( id = '' ) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`El id : ${id} No existe`)
    }
}

module.exports = {
    isRoleValid,
    existEmail,
    existUserById
}