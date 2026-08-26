const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../src/animations');
const INDEX_CSS_PATH = path.join(__dirname, '../src/index.css');
const MANIFEST_PATH = path.join(__dirname, '../../../site/src/manifest.json');

// Ensure directories exist
['entrances', 'exits', 'attention', 'transforms', 'motion', 'ui', 'blur', 'depth'].forEach(dir => {
  fs.mkdirSync(path.join(OUTPUT_DIR, dir), { recursive: true });
});

const generatedAnimations = [];
let indexCssContent = `/* This file is auto-generated */
@import './tokens.css';
@import './base.css';
@import './utilities.css';

`;

function saveAnimation(familyDir, name, keyframes) {
  const css = `${keyframes}

.${name} {
  animation-name: ${name};
}
`;
  const filePath = path.join(OUTPUT_DIR, familyDir, `${name}.css`);
  fs.writeFileSync(filePath, css);
  
  generatedAnimations.push(name);
  indexCssContent += `@import './animations/${familyDir}/${name}.css';\n`;
}

// Helper to generate matrix
const directions = [
  { name: '', transform: '' },
  { name: '-up', transform: 'translate3d(0, -VAR, 0)' },
  { name: '-down', transform: 'translate3d(0, VAR, 0)' },
  { name: '-left', transform: 'translate3d(-VAR, 0, 0)' },
  { name: '-right', transform: 'translate3d(VAR, 0, 0)' },
  { name: '-up-left', transform: 'translate3d(-VAR, -VAR, 0)' },
  { name: '-up-right', transform: 'translate3d(VAR, -VAR, 0)' },
  { name: '-down-left', transform: 'translate3d(-VAR, VAR, 0)' },
  { name: '-down-right', transform: 'translate3d(VAR, VAR, 0)' }
];

const distances = [
  { name: '-sm', var: 'var(--px-distance-sm)' },
  { name: '', var: 'var(--px-distance-md)' },
  { name: '-lg', var: 'var(--px-distance-lg)' }
];

const scales = [
  { name: '-sm', var: 'var(--px-scale-sm)' },
  { name: '', var: 'var(--px-scale-md)' },
  { name: '-lg', var: 'var(--px-scale-lg)' },
  { name: '-pop', var: 'var(--px-scale-pop)' }
];

const blurs = [
  { name: '-sm', var: '4px' },
  { name: '', var: '10px' },
  { name: '-lg', var: '20px' }
];

const angles = [
  { name: '-sm', var: 'var(--px-rotate-sm)' },
  { name: '', var: 'var(--px-rotate-md)' },
  { name: '-lg', var: 'var(--px-rotate-lg)' }
];

// FADE IN (9 * 3 = 27 + 1 = 28)
distances.forEach(dist => {
  directions.forEach(dir => {
    if (dir.name === '' && dist.name !== '') return; // Don't generate fade-in-sm, just fade-in
    const name = `px-fade-in${dir.name}${dist.name}`;
    const t = dir.transform ? dir.transform.replace(/VAR/g, dist.var) : '';
    const keyframes = `@keyframes ${name} {
  0% { opacity: 0; ${t ? `transform: ${t};` : ''} }
  100% { opacity: 1; ${t ? `transform: translate3d(0, 0, 0);` : ''} }
}`;
    saveAnimation('entrances', name, keyframes);
  });
});

// FADE OUT
distances.forEach(dist => {
  directions.forEach(dir => {
    if (dir.name === '' && dist.name !== '') return;
    const name = `px-fade-out${dir.name}${dist.name}`;
    const t = dir.transform ? dir.transform.replace(/VAR/g, dist.var) : '';
    const keyframes = `@keyframes ${name} {
  0% { opacity: 1; ${t ? `transform: translate3d(0, 0, 0);` : ''} }
  100% { opacity: 0; ${t ? `transform: ${t};` : ''} }
}`;
    saveAnimation('exits', name, keyframes);
  });
});

// SLIDE IN (no opacity change, 8 * 3 = 24)
distances.forEach(dist => {
  directions.forEach(dir => {
    if (dir.name === '') return;
    const name = `px-slide-in${dir.name}${dist.name}`;
    const t = dir.transform.replace(/VAR/g, dist.var);
    const keyframes = `@keyframes ${name} {
  0% { transform: ${t}; }
  100% { transform: translate3d(0, 0, 0); }
}`;
    saveAnimation('entrances', name, keyframes);
  });
});

// SLIDE OUT (24)
distances.forEach(dist => {
  directions.forEach(dir => {
    if (dir.name === '') return;
    const name = `px-slide-out${dir.name}${dist.name}`;
    const t = dir.transform.replace(/VAR/g, dist.var);
    const keyframes = `@keyframes ${name} {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: ${t}; }
}`;
    saveAnimation('exits', name, keyframes);
  });
});

// ZOOM IN (scale + opacity) -> directions (5) x scales (4) = 20
const zoomDirs = directions.slice(0, 5); // center, up, down, left, right
scales.forEach(sc => {
  zoomDirs.forEach(dir => {
    const name = `px-zoom-in${dir.name}${sc.name}`;
    const distVar = 'var(--px-distance-md)'; // default dist for zoom transforms
    let t0 = `scale3d(${sc.var}, ${sc.var}, ${sc.var})`;
    if (dir.name !== '') {
      t0 += ` ` + dir.transform.replace(/VAR/g, distVar);
    }
    const keyframes = `@keyframes ${name} {
  0% { opacity: 0; transform: ${t0}; }
  100% { opacity: 1; transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
}`;
    saveAnimation('entrances', name, keyframes);
  });
});

// ZOOM OUT (20)
scales.forEach(sc => {
  zoomDirs.forEach(dir => {
    const name = `px-zoom-out${dir.name}${sc.name}`;
    const distVar = 'var(--px-distance-md)';
    let t1 = `scale3d(${sc.var}, ${sc.var}, ${sc.var})`;
    if (dir.name !== '') {
      t1 += ` ` + dir.transform.replace(/VAR/g, distVar);
    }
    const keyframes = `@keyframes ${name} {
  0% { opacity: 1; transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
  100% { opacity: 0; transform: ${t1}; }
}`;
    saveAnimation('exits', name, keyframes);
  });
});

// ROTATE IN (opacity + rotateX/Y/Z) (3 axes * 3 angles = 9)
['', '-x', '-y'].forEach(axis => {
  angles.forEach(ang => {
    const name = `px-rotate${axis}-in${ang.name}`;
    const axisCall = axis === '' ? 'rotateZ' : `rotate${axis.replace('-', '').toUpperCase()}`;
    const keyframes = `@keyframes ${name} {
  0% { opacity: 0; transform: ${axisCall}(${ang.var}); }
  100% { opacity: 1; transform: ${axisCall}(0deg); }
}`;
    saveAnimation('entrances', name, keyframes);
  });
});

// ROTATE OUT (9)
['', '-x', '-y'].forEach(axis => {
  angles.forEach(ang => {
    const name = `px-rotate${axis}-out${ang.name}`;
    const axisCall = axis === '' ? 'rotateZ' : `rotate${axis.replace('-', '').toUpperCase()}`;
    const keyframes = `@keyframes ${name} {
  0% { opacity: 1; transform: ${axisCall}(0deg); }
  100% { opacity: 0; transform: ${axisCall}(${ang.var}); }
}`;
    saveAnimation('exits', name, keyframes);
  });
});

// FLIP IN/OUT (4)
['x', 'y'].forEach(axis => {
  ['in', 'out'].forEach(state => {
    const name = `px-flip-${state}-${axis}`;
    const angle = state === 'in' ? 'var(--px-rotate-flip)' : '-var(--px-rotate-flip)';
    const keyframes = `@keyframes ${name} {
  ${state === 'in' ? `0% { opacity: 0; transform: perspective(400px) rotate${axis.toUpperCase()}(${angle}); }
  100% { opacity: 1; transform: perspective(400px) rotate${axis.toUpperCase()}(0deg); }` : `0% { opacity: 1; transform: perspective(400px) rotate${axis.toUpperCase()}(0deg); }
  100% { opacity: 0; transform: perspective(400px) rotate${axis.toUpperCase()}(${angle}); }`}
}`;
    saveAnimation(state === 'in' ? 'entrances' : 'exits', name, keyframes);
  });
});

// BLUR IN/OUT (6)
blurs.forEach(b => {
  const nameIn = `px-blur-in${b.name}`;
  const kIn = `@keyframes ${nameIn} {
  0% { opacity: 0; filter: blur(${b.var}); }
  100% { opacity: 1; filter: blur(0); }
}`;
  saveAnimation('blur', nameIn, kIn);

  const nameOut = `px-blur-out${b.name}`;
  const kOut = `@keyframes ${nameOut} {
  0% { opacity: 1; filter: blur(0); }
  100% { opacity: 0; filter: blur(${b.var}); }
}`;
  saveAnimation('blur', nameOut, kOut);
});

// ADDITIONAL COMBINATIONS
// Fade Slide (24 in + 24 out = 48)
distances.forEach(dist => {
  directions.forEach(dir => {
    if (dir.name === '') return;
    const nameIn = `px-fade-slide-in${dir.name}${dist.name}`;
    const t = dir.transform.replace(/VAR/g, dist.var);
    saveAnimation('entrances', nameIn, `@keyframes ${nameIn} {
  0% { opacity: 0; transform: ${t}; }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}`);

    const nameOut = `px-fade-slide-out${dir.name}${dist.name}`;
    saveAnimation('exits', nameOut, `@keyframes ${nameOut} {
  0% { opacity: 1; transform: translate3d(0, 0, 0); }
  100% { opacity: 0; transform: ${t}; }
}`);
  });
});

// Attention (Pulse, Flash, Shake, etc) ~10
saveAnimation('attention', 'px-pulse', `@keyframes px-pulse {
  0% { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(var(--px-scale-pop), var(--px-scale-pop), var(--px-scale-pop)); }
  100% { transform: scale3d(1, 1, 1); }
}`);

saveAnimation('attention', 'px-flash', `@keyframes px-flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}`);

saveAnimation('attention', 'px-shake-x', `@keyframes px-shake-x {
  0%, 100% { transform: translate3d(0, 0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
  20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); }
}`);

saveAnimation('attention', 'px-shake-y', `@keyframes px-shake-y {
  0%, 100% { transform: translate3d(0, 0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3d(0, -10px, 0); }
  20%, 40%, 60%, 80% { transform: translate3d(0, 10px, 0); }
}`);

saveAnimation('attention', 'px-heartbeat', `@keyframes px-heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}`);

// SKEW IN/OUT (12)
['x', 'y'].forEach(axis => {
  ['in', 'out'].forEach(state => {
    angles.forEach(ang => {
      const name = `px-skew-${axis}-${state}${ang.name}`;
      const k = state === 'in' 
        ? `@keyframes ${name} { 0% { opacity: 0; transform: skew${axis.toUpperCase()}(${ang.var}); } 100% { opacity: 1; transform: skew${axis.toUpperCase()}(0deg); } }`
        : `@keyframes ${name} { 0% { opacity: 1; transform: skew${axis.toUpperCase()}(0deg); } 100% { opacity: 0; transform: skew${axis.toUpperCase()}(${ang.var}); } }`;
      saveAnimation('transforms', name, k);
    });
  });
});

// BOUNCE IN (5)
zoomDirs.forEach(dir => {
  const name = `px-bounce-in${dir.name}`;
  let t0 = ''; let t50 = ''; let t70 = ''; let t90 = ''; let t100 = '';
  if (dir.name === '') {
    t0 = 'scale3d(0.3, 0.3, 0.3)'; t50 = 'scale3d(1.05, 1.05, 1.05)'; t70 = 'scale3d(0.9, 0.9, 0.9)'; t100 = 'scale3d(1, 1, 1)';
  } else {
    const dist = '3000px'; const dist2 = '-25px'; const dist3 = '10px'; const dist4 = '-5px';
    const axis = (dir.name === '-up' || dir.name === '-down') ? 'Y' : 'X';
    const sign = (dir.name === '-up' || dir.name === '-left') ? '-' : '';
    const oppSign = sign === '-' ? '' : '-';
    t0 = `translate${axis}(${sign}${dist})`;
    t50 = `translate${axis}(${oppSign}25px)`;
    t70 = `translate${axis}(${sign}10px)`;
    t90 = `translate${axis}(${oppSign}5px)`;
    t100 = `translate${axis}(0)`;
  }
  const k = `@keyframes ${name} {
  0% { opacity: 0; transform: ${t0}; }
  50% { opacity: 1; transform: ${t50}; }
  70% { transform: ${t70}; }
  90% { transform: ${t90}; }
  100% { opacity: 1; transform: ${t100}; }
}`;
  saveAnimation('entrances', name, k);
});

// BOUNCE OUT (5)
zoomDirs.forEach(dir => {
  const name = `px-bounce-out${dir.name}`;
  let t20 = ''; let t100 = '';
  if (dir.name === '') {
    t20 = 'scale3d(0.9, 0.9, 0.9)'; t100 = 'scale3d(0.3, 0.3, 0.3)';
  } else {
    const axis = (dir.name === '-up' || dir.name === '-down') ? 'Y' : 'X';
    const sign = (dir.name === '-up' || dir.name === '-left') ? '-' : '';
    const oppSign = sign === '-' ? '' : '-';
    t20 = `translate${axis}(${oppSign}10px)`;
    t100 = `translate${axis}(${sign}2000px)`;
  }
  const k = `@keyframes ${name} {
  20% { transform: ${t20}; }
  100% { opacity: 0; transform: ${t100}; }
}`;
  saveAnimation('exits', name, k);
});

// SCALE IN (no opacity) (20)
scales.forEach(sc => {
  zoomDirs.forEach(dir => {
    const name = `px-scale-in${dir.name}${sc.name}`;
    let t0 = `scale3d(${sc.var}, ${sc.var}, ${sc.var})`;
    if (dir.name !== '') t0 += ` ` + dir.transform.replace(/VAR/g, 'var(--px-distance-md)');
    const keyframes = `@keyframes ${name} {
  0% { transform: ${t0}; }
  100% { transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
}`;
    saveAnimation('entrances', name, keyframes);
  });
});

// SCALE OUT (20)
scales.forEach(sc => {
  zoomDirs.forEach(dir => {
    const name = `px-scale-out${dir.name}${sc.name}`;
    let t1 = `scale3d(${sc.var}, ${sc.var}, ${sc.var})`;
    if (dir.name !== '') t1 += ` ` + dir.transform.replace(/VAR/g, 'var(--px-distance-md)');
    const keyframes = `@keyframes ${name} {
  0% { transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
  100% { transform: ${t1}; }
}`;
    saveAnimation('exits', name, keyframes);
  });
});

// BLUR-FADE IN/OUT (6)
blurs.forEach(b => {
  saveAnimation('blur', `px-blur-fade-in${b.name}`, `@keyframes px-blur-fade-in${b.name} {
  0% { opacity: 0; filter: blur(${b.var}); }
  100% { opacity: 1; filter: blur(0); }
}`);
  saveAnimation('blur', `px-blur-fade-out${b.name}`, `@keyframes px-blur-fade-out${b.name} {
  0% { opacity: 1; filter: blur(0); }
  100% { opacity: 0; filter: blur(${b.var}); }
}`);
});

// FADE-ZOOM (40)
scales.forEach(sc => {
  zoomDirs.forEach(dir => {
    saveAnimation('entrances', `px-fade-zoom-in${dir.name}${sc.name}`, `@keyframes px-fade-zoom-in${dir.name}${sc.name} {
  0% { opacity: 0; transform: scale3d(${sc.var}, ${sc.var}, ${sc.var}); }
  100% { opacity: 1; transform: scale3d(1, 1, 1); }
}`);
    saveAnimation('exits', `px-fade-zoom-out${dir.name}${sc.name}`, `@keyframes px-fade-zoom-out${dir.name}${sc.name} {
  0% { opacity: 1; transform: scale3d(1, 1, 1); }
  100% { opacity: 0; transform: scale3d(${sc.var}, ${sc.var}, ${sc.var}); }
}`);
  });
});

// Save Index
fs.writeFileSync(INDEX_CSS_PATH, indexCssContent);

// Save Manifest for React site (stripping 'px-' for the dropdown)
const strippedAnimations = generatedAnimations.map(name => name.replace('px-', ''));
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(strippedAnimations, null, 2));

console.log(`Successfully generated ${generatedAnimations.length} animations!`);
