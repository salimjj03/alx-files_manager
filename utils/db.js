// utils/db.js

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = database;
    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.dbName);
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
      });
  }

  isAlive() {
    return this.client.isConnected() && this.db;
  }

  async nbUsers() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    }
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    }
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;

