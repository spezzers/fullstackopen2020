# Part 7 - Bloglist

## To-do
- [x] Fix remove button on blogs
- [x] Fix like button on blogs
- [x] Fix bug that makes login form reset when notification times out
- [x] Finish useField implementation
- [x] Fix console warning when logging in: "Can't perform a React state update on an unmounted component"
- [x] Fix bug after 7.17, can no longer like a blog with comments on (400)

## Testing
For testing with **Cypress**, start the test server with `npm run dev:test`

## Issues

### User Authorization and the Node Environment
Although the 'root' user has the same credentials, the token may be invalid depending on which NODE_ENV backend configuration provided it.

`NODE_ENV=development` and `NODE_ENV=test` will produce and expect deifferent tokens. If you log in on one, then swith the backend to the other environment, the frontend appears to remain logged in but requests requiring authorization fail.