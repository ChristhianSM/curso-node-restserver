const { Schema , model } = require("mongoose");

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es Obligatorio'],
    },
    email :{ 
        type: String,
        required: [true, 'El Correo es Obligatorio'],
        unique:true,
    },
    password :{ 
        type: String,
        required: [true, 'La contraseña es Obligatorio'],
    },
    img :{ 
        type: String
    },
    role :{ 
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state :{ 
        type: Boolean,
        default: true,
    },
    google :{ 
        type: Boolean,
        default: false,
    },
})

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('Usuario', UsuarioSchema);