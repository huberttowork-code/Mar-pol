// Lokalny podglad makiety, serwuje dokladnie to samo co hosting.
//   node serve.js   ->  http://localhost:4173
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT ? Number(process.env.PORT) : 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".toml": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

http
  .createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split("?")[0]);
    if (rel === "/") rel = "/index.html";

    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end("forbidden");
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        // tak samo jak przekierowanie w netlify.toml
        fs.readFile(path.join(ROOT, "index.html"), (e2, page) => {
          if (e2) {
            res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
            res.end("Brak index.html. Uruchom: bash src/build.sh");
            return;
          }
          res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
          res.end(page);
        });
        return;
      }
      res.writeHead(200, {
        "content-type": types[path.extname(file).toLowerCase()] || "application/octet-stream"
      });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log("podglad na http://localhost:" + PORT));
