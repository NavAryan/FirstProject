import {copyFileSync,mkdirSync} from 'node:fs';
mkdirSync('dist',{recursive:true});
for(const name of ['index.html','styles.css','manifest.webmanifest','icon-192.png','icon-512.png','app.js','db.js','defaults.js','smart.js','planner.js','state.js','ui.js','sw.js'])copyFileSync(name,'dist/'+name);
