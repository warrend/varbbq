import * as fs from 'fs';
import path from 'path';
import { defaultConfig } from './defaultConfig';

type Config = Record<string, Array<string | number>>;

let cssContent = ':root {\n';
let tsContent = 'export const varbbq = {\n';

export const generateTheme = () => {
  cssContent = ':root {\n';
  tsContent = 'export const varbbq = {\n';

  try {
    const configPath = path.join(process.cwd(), 'varbbq.json');
    const cssFilePath = path.join(process.cwd(), 'varbbq', 'theme.css');
    const tsFilePath = path.join(process.cwd(), 'varbbq', 'theme.ts');

    let config: Config;

    if (fs.existsSync(configPath)) {
      console.log('varbbq.json already exists, reading configuration.');
      const rawdata = fs.readFileSync(configPath, 'utf-8');
      config = JSON.parse(rawdata);
    } else {
      // Write default configuration to varbbq.json
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      console.log('varbbq.json created with default configuration.');
      config = defaultConfig;
    }

    loopKeys(config);

    cssContent += '}\n';
    tsContent += '}\n';

    fs.mkdirSync(path.dirname(cssFilePath), { recursive: true });
    fs.mkdirSync(path.dirname(tsFilePath), { recursive: true });
    fs.writeFileSync(cssFilePath, cssContent);
    fs.writeFileSync(tsFilePath, tsContent);

    console.log('\x1b[32m%s\x1b[0m', 'CSS and TS files generated.');
  } catch (error) {
    console.error('Error generating theme:', error);
  }
};

function loopKeys(obj: Config) {
  for (const key in obj) {
    obj[key].forEach((val, index) => {
      cssContent += `  --${key}${(index + 1) * 100}: ${val};\n`;
      tsContent += `  ${key}${(index + 1) * 100}: "${val}",\n`;
    });
  }
}

generateTheme();

export function watchTheme() {
  const configPath = path.join(process.cwd(), 'varbbq.json');
  fs.watch(configPath, (eventType, filename) => {
    if (eventType === 'change') {
      generateTheme();
    }
  });
}
