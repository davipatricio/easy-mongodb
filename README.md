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
- `Database#connection` **|** Mongoose connection object
- `Database#db` **|** Mongoose connection object
- `Database#model` **|** Mongoose model object
- `Database#mongoose` **|** Mongoose model object
- `Database#schema` **|** Mongoose schema object

- `Database#set(key, value)` **|** Create or changes a key with the specified value
  ```js
  Database.set('website', 'www.github.com/DenkyLabs');
  ```
  - Types:
    - Key name: any (\*)
    - Value: any (\*)

- `Database#get(key)` **|** Returns the value of the specified key
  ```js
  Database.get('website');
  ```
  - Types:
    - Key name: any (\*)
    - Returns: undefined or any (\*)

- `Database#delete(key)` **|** Delete a key from the database
  ```js
  Database.delete('website');
  ```
  - Types:
    - Key name: any (\*)
    - Returns: Object or null

- `Database#exists(key)` **|** Check if a key exists
  ```js
  Database.exists('website');
  ```
  - Types:
    - Key name: any (\*)
    - Returns: boolean

- `Database#inc(key)` **|** Increment a number to the key (addition)
  ```js
  await Database.set('number', 15);
  Database.inc('number', 30) // Sets the value to 45
  ```
  - Types:
    - Key name: any (\*)
    - Returns: Object or number

- `Database#dec(key)` **|** Decrease a number to the key (addition)
  ```js
  await Database.set('number', 15);
  Database.dec('number', 10) // Sets the value to 5
  ```
  - Types:
    - Key name: any (\*)
    - Returns: Object or number

- `Database#deleteAll()` **|** Deletes everything from the database
```js
Database.deleteAll()
```
  - Types:
    - Returns: Array<Deleted object names or empty>
	
- `Database#keyArray()` **|** Get all keys from the database
```js
Database.keyArray();
```
  - Types:
    - Returns: Array<any>
 
- `Database#getAll()` **|** Get all objects from the database
```js
Database.getAll();
```
  - Types:
    - Returns: Array<any>
	
- `Database#pull(key, value)` **|** Remove an item from an array
```js
await Database.set('companies', ['Google', 'Facebook'])
Database.pull('companies', 'Google'); // ['Facebook']
```
  - Types:
    - Returns: Object
	
- `Database#push(key, value)` **|** Add an item from an array
```js
await Database.set('companies', ['Facebook'])
Database.pull('companies', 'Google'); // ['Facebook', 'Google']
```
  - Types:
    - Returns: Object
	
- `Database#push(key, value)` **|** Add an item from an array
```js
await Database.set('companies', ['Amazon'])
Database.includes('companies', 'Amazon'); // true
```
  - Types:
    - Returns: boolean
