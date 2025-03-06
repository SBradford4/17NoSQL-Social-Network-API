import mongoose from 'mongoose';
console.log(process.env.MONGODB_URI)
const db = async (): Promise<typeof mongoose.connection> =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

export default db;
