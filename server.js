// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Directory where you want to search files
const directoryPath = path.join(__dirname, 'files');

// Serve static files (like CSS and JS)
app.use(express.static('public'));

// Endpoint to get the list of file names (filter by query)
app.get('/files', (req, res) => {
  const query = req.query.q || '';
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    
    // Filter files based on the query
    const filteredFiles = files.filter(file => file.toLowerCase().includes(query.toLowerCase()));
    res.json(filteredFiles);
  });
});

// Endpoint to open a file (read its content)
app.get('/file-content', (req, res) => {
  const fileName = req.query.name;
  const filePath = path.join(directoryPath, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Unable to read file');
    }
    res.send(data);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
