const fs = require('fs');
const path = require('path');

const stotrasJsonPath = path.join(__dirname, '../src/data/stotras.json');
const contentDir = path.join(__dirname, '../src/data/content');

let stotras = require(stotrasJsonPath);

// 1. Convert all ids in stotras.json to lowercase, and save them.
stotras.forEach(s => {
  s.id = s.id.toLowerCase();
});

const stotraMap = new Map();
stotras.forEach(s => {
  stotraMap.set(`${s.godId}/${s.id}`, s);
});

const gods = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());

let added = 0;

gods.forEach(godId => {
  const godDir = path.join(contentDir, godId);
  const files = fs.readdirSync(godDir).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    const id = file.replace('.json', '');
    const key = `${godId}/${id}`;
    
    // Some manual mappings for known renames:
    if (key === 'durga/poorvangam-smartha-paddhati' && stotraMap.has('durga/puja-vidhanam-purvanga-smartapaddhati')) {
       let old = stotraMap.get('durga/puja-vidhanam-purvanga-smartapaddhati');
       old.id = id;
       stotraMap.delete('durga/puja-vidhanam-purvanga-smartapaddhati');
       stotraMap.set(key, old);
       return;
    }
    
    if (!stotraMap.has(key)) {
      // Add missing file to stotras.json
      const contentPath = path.join(godDir, file);
      try {
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
        
        let category = 'stotras'; // default
        if (id.includes('puja') || id.includes('pooja') || id.includes('vidhanam') || id.includes('poorvangam')) {
          category = 'pujas';
        } else if (id.includes('vratha') || id.includes('vratham') || id.includes('vrata')) {
          category = 'vratas';
        } else if (id.includes('upanishad') || id.includes('upanishat')) {
          category = 'upanishad';
        }
        
        const newStotra = {
          id: id,
          godId: godId,
          category: category,
          titleEn: content.title?.en || content.title?.te || id,
          titleTe: content.title?.te || content.title?.en || id
        };
        
        stotras.push(newStotra);
        stotraMap.set(key, newStotra);
        added++;
        console.log(`Added missing stotra: ${key} to stotras.json`);
      } catch (e) {
        console.error(`Failed to read/parse ${contentPath}`);
      }
    }
  });
});

// Remove entries in stotras.json that don't have a corresponding file
let removed = 0;
const finalStotras = stotras.filter(s => {
  const filePath = path.join(contentDir, s.godId, `${s.id}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`Removed orphaned entry from stotras.json: ${s.godId}/${s.id}`);
    removed++;
    return false;
  }
  return true;
});

fs.writeFileSync(stotrasJsonPath, JSON.stringify(finalStotras, null, 2));

console.log(`\nDone. Added ${added} entries, removed ${removed} orphaned entries.`);
