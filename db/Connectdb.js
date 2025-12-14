import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI;  // ← Match your .env name
    console.log("Connecting to:", connStr ? connStr.slice(0, 50) + "..." : "NO URI");
    
    if (!connStr) {
      throw new Error("MONGO_URI not found in .env");
    }
    
    await mongoose.connect(connStr);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
