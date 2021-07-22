# easy-mongodb
MongoDB wrapper for beginners using Mongoose and simple syntax made with JavaScript.

---

A simple promise-based wrapper made for beginners with focus in Performance and Simplicity.
Inspired in [quick.db](https://www.npmjs.com/package/quick.db), [Enmap](https://www.npmjs.com/package/enmap) and [denky-database](https://www.npmjs.com/package/denky-database)

---

## Installation
`npm install easy-mongodb --production`

`yarn add easy-mongodb`

## Support
Create a issue or join my Discord server [click here](https://discord.gg/bVWdscg) (support only in english and portuguese)

---

## Example
```js
const DatabaseManager = require('./index');
const db = new DatabaseManager('mongodb url here', 'name');

db.on('ready', async () => {
	console.log('Database connected successfully.');
  
  // Create key 'companies' with an array as value.
  await db.set('companies', ['Facebook', 'Apple', 'Amazon', 'Netflix', 'Google'];
  
  // Get the companies list from database
  const companiesList = await db.get('companies');
  console.log(companiesList); // Should return an array.
});

db.on('error', (mongooseError) => {
  console.log('Unexpected error:', mongooseError);
});

db.on('disconnect', (mongooseError) => {
  console.log('Disconnected from the database. Trying to reconnect automatically...');
});

db.connect();
```

---

## Documentation
