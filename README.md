# fullstackopen2020
 Full Stack Open 2020


## Questions/further reading
- Why do I need SuperTest, exactly?
    - Can I not test (HTTP) API requests without it or something?

## async/await
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