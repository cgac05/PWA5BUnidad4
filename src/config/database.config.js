//NOTA D.2: Configuración de conexión a MongoDB - Punto D
//Establece la conexión con la base de datos NoSQL

import mongoose from 'mongoose'; 
import config from './config'; 

//BAFS: Conectar a MongoDB usando CONNECTION_STRING del config
(async () => { 
    try { 
        const db = await mongoose.connect(
            config.MONGODB.CONNECTION_STRING, 
            config.MONGODB.OPTIONS
        );
        
        console.log('MongoDB Connection Established');
        console.log(`   Database: ${db.connection.name}`);
        console.log(`   Host: ${db.connection.host}`);
        console.log(`   Port: ${db.connection.port}`);
        
    } catch (error) { 
        console.error('MongoDB Connection Error:', error.message);
        
        console.log('Retrying connection in 5 seconds...');
        setTimeout(() => {
            process.exit(1);
        }, 5000);
    } 
})();

//CDCH: Eventos de conexión a MongoDB
mongoose.connection.on('error', (error) => {
    console.error('Mongoose Error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB Disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB Reconnected');
});

export { mongoose };