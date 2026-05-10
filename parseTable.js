import fs from 'fs';

const text = fs.readFileSync('PanelTable.txt', 'utf-8');
const lines = text.split('\n').filter(line => line.trim().startsWith('|'));

const data = [];
for (let i = 2; i < lines.length; i++) { // Skip header and separator
    const line = lines[i];
    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 6) continue;
    
    const row = parseInt(parts[1], 10);
    const col = parseInt(parts[2], 10);
    const label = parts[3];
    const type = parts[4];
    const color = parts[5];
    
    if (!isNaN(row) && !isNaN(col)) {
        data.push({ row, col, label, type, color });
    }
}

if (!fs.existsSync('src')) {
    fs.mkdirSync('src');
}

fs.writeFileSync('src/panelData.js', `export const panelData = ${JSON.stringify(data, null, 2)};\n`);
console.log('src/panelData.js generated successfully.');
