const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((request, result) => {
    const query = url.parse(request.url, true);
    const filename =
      query.pathname === "/" ? `/index.html` : `${query.pathname}.html`;

    const arrayName = filename.substring(1)

    const dir = fs.readdirSync(__dirname)

    if (dir.indexOf(arrayName) > -1 || arrayName === "/" || arrayName === "") {
      fs.readFile(arrayName, (err, data) => {
        if (err) {
          result.writeHead(404, { "Content-Type": "text/html" });
          return result.end("<h1>Oops, something went wrong!</h1>");
        } else {
          result.writeHead(200, { "Content-Type": "text/html" });
          result.write(data);
          return result.end();
        }
      });
    } else {
      result.writeHead(404, { "Content-Type": "text/html" });
      return result.end("<h1>Oops, something went wrong!</h1>");
    }
  })
  .listen(8080);

