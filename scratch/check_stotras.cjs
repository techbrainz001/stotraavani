const fs = require('fs');
const path = require('path');

const stotrasJsonPath = path.join(__dirname, '../src/data/stotras.json');
const contentDir = path.join(__dirname, '../src/data/content');

const stotras = require(stotrasJsonPath);
const stotraMap = new Map();

stotras.forEach(s => {
  stotraMap.set(`${s.godId}/${s.id}`, s);
});

const gods = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());

let missingInJson = [];
let totalFiles = 0;

gods.forEach(godId => {
  const godDir = path.join(contentDir, godId);
  const files = fs.readdirSync(godDir).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    totalFiles++;
    const id = file.replace('.json', '');
    if (!stotraMap.has(`${godId}/${id}`)) {
      missingInJson.push(`${godId}/${id}`);
    }
  });
});

let missingInContent = [];
stotras.forEach(s => {
  const filePath = path.join(contentDir, s.godId, `${s.id}.json`);
  if (!fs.existsSync(filePath)) {
    missingInContent.push(`${s.godId}/${s.id}`);
  }
});

console.log(`Total files in content/: ${totalFiles}`);
console.log(`Total entries in stotras.json: ${stotras.length}`);
console.log(`\nFiles missing in stotras.json (${missingInJson.length}):`);
console.log(missingInJson.join('\n'));

console.log(`\nEntries missing in content folder (${missingInContent.length}):`);
console.log(missingInContent.join('\n'));
