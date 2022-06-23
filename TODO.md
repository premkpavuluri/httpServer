# HTTP Server

- **TODO:**
  - [ ] Extract the onRequest from the main function.
  - [ ] Make handleRequest to appropriate response
    - [ ] status code and it's corresponding status code name
    - [ ] HTTP version

- **DONE:**
  - [x] Pass response to handleRequest instead of socket.
  - [x] Make response as an entity.
  - [x] parameterize the port and handler
  - [x] Extract the parse functionality into other file
  - [x] Test handleRequest
  - [x] Test parseRequestLine
  - [x] Make request parser(HTTP standards)
  - [x] Make request Handler
    - [x] Serve the request based on URI
  - [x] Create a server which serves one request and dies
