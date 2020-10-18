# Part 7 - Bloglist

## To-do
- [x] Fix remove button on blogs
- [x] Fix like button on blogs
- [ ] Fix bug that makes login form reset when notification times out
- [ ] Finish useField implementation

## Testing
For testing with **Cypress**, start the test server with `npm run dev:test`

## Issues

### User Authorization and the Node Environment
Although the 'root' user has the same credentials, the token may be invalid depending on which NODE_ENV backend configuration provided it.

`NODE_ENV=development` and `NODE_ENV=test` will produce and expect deifferent tokens. If you log in on one, then swith the backend to the other environment, the frontend appears to remain logged in but requests requiring authorization fail.