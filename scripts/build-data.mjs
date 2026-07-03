import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const sourceFile = path.join(rootDir, 'photos.md');
const jsonFile = path.join(rootDir, 'data', 'photos.json');
const jsFile = path.join(rootDir, 'data.js');

const markdown = await readFile(sourceFile, 'utf8');
const entries = parsePhotoMarkdown(markdown);

await mkdir(path.dirname(jsonFile), { recursive: true });
await writeFile(jsonFile, `${JSON.stringify(entries, null, 2)}\n`);
await writeFile(jsFile, `window.photoEntries = ${JSON.stringify(entries, null, 2)};\n`);

console.log(`Generated ${path.relative(rootDir, jsonFile)} and ${path.relative(rootDir, jsFile)}`);

function parsePhotoMarkdown(input) {
  const blocks = splitEntries(input);

  return blocks.map((block, index) => parseEntry(block, index)).filter(Boolean);
}

function splitEntries(input) {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current) blocks.push(current);
      current = [line];
      continue;
    }

    if (current) current.push(line);
  }

  if (current) blocks.push(current);
  return blocks;
}

function parseEntry(lines, index) {
  const title = lines[0].replace(/^##\s+/, '').trim();
  const entry = {
    title,
    date: '',
    location: '',
    camera: '',
    description: '',
    photos: []
  };
  const descriptionLines = [];

  for (const rawLine of lines.slice(1)) {
    const line = rawLine.trim();

    if (!line || line === '---') {
      continue;
    }

    const field = parseField(line);
    if (field) {
      entry[field.key] = field.value;
      continue;
    }

    const photo = parsePhoto(line);
    if (photo) {
      entry.photos.push(photo);
      continue;
    }

    descriptionLines.push(line);
  }

  entry.description = descriptionLines.join('\n').trim();

  for (const key of ['title', 'date', 'location', 'camera']) {
    if (!entry[key]) {
      throw new Error(`Entry ${index + 1} is missing ${key}`);
    }
  }

  if (entry.photos.length === 0) {
    throw new Error(`Entry ${index + 1} "${entry.title}" has no photos`);
  }

  return entry;
}

function parseField(line) {
  const match = line.match(/^(日期|date|地点|location|相机|camera)\s*[:：]\s*(.+)$/i);
  if (!match) return null;

  const keyMap = {
    '日期': 'date',
    date: 'date',
    '地点': 'location',
    location: 'location',
    '相机': 'camera',
    camera: 'camera'
  };

  return {
    key: keyMap[match[1].toLowerCase()] ?? keyMap[match[1]],
    value: match[2].trim()
  };
}

function parsePhoto(line) {
  if (!line.startsWith('- ')) return null;

  const value = line.slice(2).trim();
  const [src, camera = ''] = value.split('|').map((part) => part.trim());

  if (!src) return null;

  const photo = { src, alt: '' };
  if (camera) photo.camera = camera;
  return photo;
}
