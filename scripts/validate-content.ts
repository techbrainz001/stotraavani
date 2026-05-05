import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { StotraRegistryItem, StotraContent } from '../src/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STOTRAS_JSON = path.join(ROOT, 'src/data/stotras.json');
const CONTENT_DIR = path.join(ROOT, 'src/data/content');

async function validate() {
  console.log('🔍 Starting Content Validation...');
  
  if (!fs.existsSync(STOTRAS_JSON)) {
    console.error('❌ Registry not found at:', STOTRAS_JSON);
    process.exit(1);
  }

  const stotras = JSON.parse(fs.readFileSync(STOTRAS_JSON, 'utf8')) as StotraRegistryItem[];
  console.log(`📋 Found ${stotras.length} entries in registry.`);

  const missingFiles: string[] = [];
  const invalidFiles: string[] = [];

  stotras.forEach((s: StotraRegistryItem) => {
    const filePath = path.join(CONTENT_DIR, `${s.id}.json`);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(s.id);
    } else {
      // Basic JSON validity check
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8')) as StotraContent;
        if (!content.title || !content.verses) {
          invalidFiles.push(s.id);
        }
      } catch (e) {
        invalidFiles.push(`${s.id} (Invalid JSON)`);
      }
    }
  });

  console.log('\n--- Results ---');
  console.log(`✅ Valid Content: ${stotras.length - missingFiles.length - invalidFiles.length}`);
  
  if (missingFiles.length > 0) {
    console.warn(`\n⚠️ Missing Content Files (${missingFiles.length}):`);
    console.log(missingFiles.slice(0, 10).join(', ') + (missingFiles.length > 10 ? '...' : ''));
  }

  if (invalidFiles.length > 0) {
    console.error(`\n❌ Invalid/Corrupt Files (${invalidFiles.length}):`);
    console.log(invalidFiles.slice(0, 10).join(', ') + (invalidFiles.length > 10 ? '...' : ''));
  }

  if (missingFiles.length === 0 && invalidFiles.length === 0) {
    console.log('\n🌟 Perfect! All registry entries have valid content files.');
  }
}

validate();
