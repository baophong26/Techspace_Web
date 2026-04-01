const fs = require('fs');
let css = fs.readFileSync('src/assets/css/style.css', 'utf8');

css = css.replace(/\.header\s*\{[^}]*\}/, `.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
  z-index: 10;
}`);

css = css.replace(/\.top_nav\s*\{[^}]*\}/, `.top_nav {
  width: 100%;
  height: 50px;
  background: transparent;
  border-bottom: 1px solid var(--glass-border);
  transition: all 2s linear;
}`);

css = css.replace(/\.main_nav_container\s*\{[^}]*\}/, `.main_nav_container {
  width: 100%;
  background: transparent;
  box-shadow: none;
}`);

fs.writeFileSync('src/assets/css/style.css', css);
console.log('Headers fixed');
