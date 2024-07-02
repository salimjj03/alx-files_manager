const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  isAlive() {
      return this.client.connected;
  }
   
  async get(key) {
    return  new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
      if (err) {
        reject(err)
      }

      resolve(value)
      })
    })
  }
 
  async set(key, value, time) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, time, value, (err) => {
      if (err) {
	  reject(err)
      }

      resolve()
      })
    })
  }

  del(key) {
    return new Promise((reject, resolve) => {
      this.client.del(key, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
