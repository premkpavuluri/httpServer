# HTTP Server

- **TODO:**
  - [ ] Extract the onRequest from the main function.

- **DONE:**
  - [x] Parameterize the resource directory.
  - [x] Implement count method to record requests.
  - [x] Make handler to go through requestHandlers.
  - [x] Make dynamic response: no of times page hits.
  - [x] Make method for status line.
  - [x] Make handleRequest to appropriate response
    - [x] status code and it's corresponding status code name
    - [x] HTTP version
  - [x] Make method for headers.
  - [x] separate the status-line,headers and body in response.send.
  - [x] Give 404 if request is not valid in serveFileContent.
  - [x] Make file serving handler
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
