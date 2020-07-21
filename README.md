Full Stack Open 2020
===
Course study notes
---
# Part 2
---
# Part 3
# Notes
### REST
**Re**presentational **S**tate **T**ransfer is an architectural style that improves ease of communication between independent systems.
- Sometimes referred to as resource [orintated architecture](https://en.wikipedia.org/wiki/Resource-oriented_architecture)
- introduced in 2000 in Roy Fielding's [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
	- a large majority of the world's purported "REST" API's do not meet Fielding's original criteria outlined in his dissertation



---
# Part 4

## Questions/further reading
### Supertest
- [x] Why do I need [SuperTest](https://github.com/visionmedia/supertest), exactly?
  - Works with [Jest](jestjs.io) to test HTTP endpoints
  - Wraps code in a way that it is more manageable than callback functions
### Mongoose models
- [ ] Improve understanding of what's happening in the mongoose model when `const Blog = mongoose.model('Blog', blogSchema)` is referenced (ie. `Blog.find({})`)

### Useful References
- Info and how to avoid [Callback Hell](http://callbackhell.com)


## Notes
    
### async/await
  - makes asynchronous code wait and behave like synchronous
  - use `try-catch` to handle errors  
    ```javascript
    try{
      ...
    } catch(exception) {
      next(exception)
    }
    ```
    - the need for `try-catch` can be eliminated by using the [express-async-errors](https://github.com/davidbanham/express-async-errors): `npm install express-async-errors --save` 

### Promises
#### Promise.all
The Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as a parameter is resolved

Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a for...of block, that guarantees a specific execution order.
```javascript
beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})
```

### Tidying up Schema
MongoDB returns an auto generated `_id` property. To customise the schema (eg. remove the prefixed underscore), modify the `toJSON` method.
```javascript
blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
    // note that value of '_id' is an object
    // convert this object to a string and assign 
    // it to the new 'id' property
    returnedObject.id = returnedObject._id.toString()
    // Remove undesired '_id' property
    delete returnedObject._id
    // Remove MongoDB version number
    delete returnedObject.__v
	}
})
```
### Security
#### Encrypting Passwords
using **bcrypt** to generate a *password hash[^passwordHash]* `npm install bcrypt --save`
- [How to safely store a password](https://codahale.com/how-to-safely-store-a-password/)
- [Notes on rounds](https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds)

[^passwordHash]: A password hash is the output of a [one-way hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) applied to the user's password