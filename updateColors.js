const fs = require('fs');
const cssPath = 'src/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const colorMap = {
  '#121212': 'var(--bg-primary)',
  '#1a1a1a': 'var(--bg-secondary)',
  '#222222': 'var(--bg-secondary)',
  '#2a2a2a': 'var(--bg-secondary)',
  '#282828': 'var(--border-dark)',
  '#333333': 'var(--border-dark)',
  '#33333b': 'var(--border-dark)',
  '#333': 'var(--border-dark)',
  
  '#e0e0e0': 'var(--text-primary)',
  '#ffffff': 'var(--text-primary)',
  '#fff': 'var(--text-primary)',
  '#f2f2f2': 'var(--text-primary)',
  '#f3f3f3': 'var(--text-primary)',
  '#ebebeb': 'var(--text-primary)',
  
  '#aaaaaa': 'var(--text-secondary)',
  '#989898': 'var(--text-secondary)',
  '#b9b4c7': 'var(--text-secondary)',
  '#777777': 'var(--text-muted)',
  '#51545f': 'var(--text-muted)',
  
  '#00d2ff': 'var(--accent-cyan)',
  '#00ffff': 'var(--accent-cyan)',
  '#0ff': 'var(--accent-cyan)',
  
  '#db5246': 'var(--accent-magenta)',
  '#fe4c50': 'var(--accent-magenta)',
  '#fe7c7f': 'var(--accent-magenta)',
  
  '#51a042': 'var(--accent-neon-green)',
  '#ffd700': 'var(--accent-yellow)',
  
  '#000000': 'var(--bg-darkest)',
  '#000': 'var(--bg-darkest)',
  
  '#fde0db': 'var(--selection-bg)',
};

const rootVariables = `
:root {
  --bg-darkest: #07080b;
  --bg-primary: #0a0c10;
  --bg-secondary: #12151c;
  --border-dark: #222632;
  
  --text-primary: #ffffff;
  --text-secondary: #c5c6c7;
  --text-muted: #808080;
  
  --accent-cyan: #00f3ff;
  --accent-magenta: #ff0055;
  --accent-neon-green: #39ff14;
  --accent-yellow: #fcee0a;
  
  --selection-bg: rgba(255, 0, 85, 0.3);
  --glass-bg: rgba(10, 12, 16, 0.75);
  --glass-border: rgba(255, 255, 255, 0.08);
}

`;

css = css.replace(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/g, (match) => {
  let hex = match.toLowerCase();
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return colorMap[hex] || match; 
});

if (!css.includes(':root {')) {
  css = rootVariables + css;
}

fs.writeFileSync(cssPath, css);
console.log('Colors replaced successfully!');
