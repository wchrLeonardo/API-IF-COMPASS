import mongoose from 'mongoose';

const DATABASE_URL = process.env.MONGO_URI;

const connection = () => {
mongoose.connect(DATABASE_URL)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
}

export default connection;