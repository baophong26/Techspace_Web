const fs = require('fs');
let css = fs.readFileSync('src/assets/css/style.css', 'utf8');

css = css.replace(/\.glass-panel-animated:hover\s*\{[^}]*\}/, `.glass-panel-animated:hover {
  border-color: var(--accent-magenta) !important;
  box-shadow: 0 20px 45px rgba(0,0,0,0.5), 0 0 30px rgba(255, 0, 85, 0.2) !important;
}`);

css = css.replace(/\.banner__button\s*\{[^}]*\}/, `.banner__button {
  display: inline-block;
  background-color: transparent !important;
  color: var(--accent-cyan) !important;
  font-weight: 800 !important;
  font-size: 1rem !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
  padding: 14px 45px !important;
  border-radius: 4px !important;
  text-decoration: none !important;
  border: 2px solid var(--accent-cyan) !important;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5), inset 0 0 5px rgba(0, 243, 255, 0.3) !important;
  text-shadow: 0 0 5px var(--accent-cyan);
  transition: all 0.3s ease !important;
}`);

css = css.replace(/\.banner__button:hover\s*\{[^}]*\}/, `.banner__button:hover {
  background-color: var(--accent-cyan) !important;
  color: var(--bg-primary) !important;
  box-shadow: 0 0 30px var(--accent-cyan), inset 0 0 10px var(--accent-cyan) !important;
  text-shadow: none !important;
}`);

fs.writeFileSync('src/assets/css/style.css', css);
console.log('Buttons fixed');
