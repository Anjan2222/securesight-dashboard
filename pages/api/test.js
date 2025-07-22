import connectToDatabase from '../../src/lib/mongodb';

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: '✅ Connected to MongoDB!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Connection failed', error: error.message });
  }
}
