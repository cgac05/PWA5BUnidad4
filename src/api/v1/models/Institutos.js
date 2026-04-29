//NOTA C.1: Modelo para Institutos Educativos
//CGAC: Crear Modelos para todas las APIs del submódulo

import * as mongoose from 'mongoose';

const institutosSchema = new mongoose.Schema({
    //MASU: IDENTIFICADORES ÚNICOS - Requeridos
    IdInstitutoOK: {
        type: String,
        required: [true, 'IdInstitutoOK es requerido'],
        unique: true,
        trim: true,
        uppercase: true,
        minlength: [1, 'IdInstitutoOK debe tener al menos 1 carácter'],
        maxlength: [50, 'IdInstitutoOK no debe exceder 50 caracteres'],
        match: [/^[A-Z0-9_-]+$/, 'IdInstitutoOK solo puede contener letras mayúsculas, números, guiones y guiones bajos']
    },

    IdInstitutoBK: {
        type: String,
        required: [true, 'IdInstitutoBK es requerido'],
        unique: true,
        trim: true,
        uppercase: true,
        minlength: [1, 'IdInstitutoBK debe tener al menos 1 carácter'],
        maxlength: [50, 'IdInstitutoBK no debe exceder 50 caracteres'],
        match: [/^[A-Z0-9_-]+$/, 'IdInstitutoBK solo puede contener letras mayúsculas, números, guiones y guiones bajos']
    },

    //JAPV: DESCRIPCIÓN - Requerido
    DesInstituto: {
        type: String,
        required: [true, 'DesInstituto es requerido'],
        trim: true,
        minlength: [5, 'DesInstituto debe tener al menos 5 caracteres'],
        maxlength: [200, 'DesInstituto no debe exceder 200 caracteres']
    },

    //BAFS: CAMPOS OPCIONALES
    Alias: {
        type: String,
        required: false,
        trim: true,
        maxlength: [50, 'Alias no debe exceder 50 caracteres'],
        default: null
    },

    Matriz: {
        type: String,
        required: false,
        trim: true,
        maxlength: [100, 'Matriz no debe exceder 100 caracteres'],
        default: null
    },

    Giro: {
        type: String,
        required: false,
        trim: true,
        enum: {
            values: [
                'Educación Preescolar',
                'Educación Primaria',
                'Educación Secundaria',
                'Educación Media Superior',
                'Educación Superior',
                'Educación Técnica',
                'Educación Técnica Superior',
                'Educación Continua',
                'Educación Especial',
                'Capacitación Profesional',
                'Otro'
            ],
            message: 'Giro debe ser uno de los valores permitidos'
        },
        default: null
    },

    IdInstitutoSupOK: {
        type: String,
        required: false,
        trim: true,
        uppercase: true,
        maxlength: [50, 'IdInstitutoSupOK no debe exceder 50 caracteres'],
        default: null
    },

    //CDCH: AUDITORÍA - Timestamps automáticos
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true,
    collection: 'cat_institutos'
});

//AGU: ÍNDICES - Para optimizar búsquedas
institutosSchema.index({ IdInstitutoOK: 1 });
institutosSchema.index({ IdInstitutoBK: 1 });
institutosSchema.index({ DesInstituto: 'text' });
institutosSchema.index({ Giro: 1 });
institutosSchema.index({ createdAt: -1 });

//BAFS: MÉTODOS ESTÁTICOS - Utilities para consultas comunes
institutosSchema.statics.findByIdOK = function(idInstitutoOK) {
    return this.findOne({ IdInstitutoOK: idInstitutoOK });
};

institutosSchema.statics.findByIdBK = function(idInstitutoBK) {
    return this.findOne({ IdInstitutoBK: idInstitutoBK });
};

institutosSchema.statics.findByGiro = function(giro) {
    return this.find({ Giro: giro });
};

//MASU: MÉTODOS DE INSTANCIA
institutosSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

export default mongoose.model(
    'cat_institutos',
    institutosSchema,
    'cat_institutos'
);