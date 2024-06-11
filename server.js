import express from 'express';
import serveStatic from 'serve-static';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()

const ENV_VARIABLES = {
    API_URL: process.env.VITE_API_BASE_URL || 'https://example.com/api',
    // Add more environment variables as needed
};

//here we are configuring dist to serve app files
app.use('/', (req, res, next) => {
    res.locals.env = ENV_VARIABLES;
    next();
});

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    // Inject environment variables into the HTML template
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Vue App</title>
      <script>
        // Inject environment variables into window object
        window.__env__ = ${JSON.stringify(ENV_VARIABLES)};
      </script>
    </head>
    <body>
      <div id="app"></div>
      <script src="/app.js"></script>
    </body>
    </html>
  `;
    res.send(html);
});


const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)