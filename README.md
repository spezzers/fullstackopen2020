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
