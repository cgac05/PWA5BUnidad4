//NOTA D.1: Configuración de variables de entorno - Punto D
//Gestión centralizada de todas las variables del sistema

import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    API_URL: process.env.API_URL || '/api/v1',
    API_VERSION: process.env.API_VERSION || 'v1',
    
    MONGODB: {
        CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || 
            'mongodb+srv://AaronGalaviz:111209@cluster0.rf8jwui.mongodb.net/?appName=Cluster0',
        
        DATABASE: process.env.MONGODB_DATABASE || 'Cluster0',
        
        USER: process.env.MONGODB_USER || 'AaronGalaviz',
        PASSWORD: process.env.MONGODB_PASSWORD || '111209',
        
        OPTIONS: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        }
    },
    
    LOG_LEVEL: process.env.LOG_LEVEL || 'dev',
    
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    
    APP_NAME: 'Sistema de Gestión de Inversiones en Recursos Educativos',
    APP_VERSION: '1.0.0',
};