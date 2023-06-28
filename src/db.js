import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dehurtado:wilson2001@ueb.s0ctll0.mongodb.net/?retryWrites=true&w=majority');
        console.log('>>> DB is connected');
    } catch (error) {
        console.log(error);
    }
};
