const mongoose = require('mongoose');

const LOCAL_URI = 'mongodb://127.0.0.1:27017/fashion-cube';
const REMOTE_URI = 'mongodb+srv://baophong2602_db_user:V1bdMl20NPVTtrSJ@cluster0.gvoqvc2.mongodb.net/fashion-cube?appName=Cluster0';

async function migrate() {
    console.log("Connecting to local database...");
    const localDb = await mongoose.createConnection(LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    console.log("Connecting to remote Atlas database...");
    const remoteDb = await mongoose.createConnection(REMOTE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Collections
    const modelsToMigrate = ['User', 'Category', 'Department', 'Product', 'Variant', 'Order', 'Cart'];

    // Read models. Since we just want to copy raw data, we can use the db instance natively.
    const collections = await localDb.db.listCollections().toArray();
    
    for (let c of collections) {
        const colName = c.name;
        console.log(`\nMigrating collection: ${colName}`);
        
        try {
            const docs = await localDb.db.collection(colName).find({}).toArray();
            console.log(`Found ${docs.length} documents in local ${colName}.`);
            
            if (docs.length > 0) {
                // To avoid duplicate key errors, we might clear remote, but safer to just insert
                try {
                	// Drop remote collection if exists to avoid conflicts
                    await remoteDb.db.collection(colName).drop().catch(e => {}); 
                	await remoteDb.db.collection(colName).insertMany(docs);
                    console.log(`✅ Successfully copied ${docs.length} documents to remote ${colName}.`);
                } catch (err) {
                    console.error(`❌ Error inserting into remote ${colName}:`, err.message);
                }
            } else {
                console.log(`Skipping empty collection: ${colName}`);
            }
        } catch (err) {
            console.error(`Error reading from local ${colName}:`, err.message);
        }
    }

    console.log("\nMigration completed!");
    localDb.close();
    remoteDb.close();
    process.exit(0);
}

migrate().catch(console.error);
