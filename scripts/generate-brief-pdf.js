// Simple PDF generator for docs/technical-brief.md using pdfkit
// Usage: npm run brief:pdf

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const ROOT = process.cwd();
const INPUT_MD = path.join(ROOT, 'docs', 'technical-brief.md');
const OUTPUT_DIR = path.join(ROOT, 'public', 'docs');
const OUTPUT_PDF = path.join(OUTPUT_DIR, 'technical-brief.pdf');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readMarkdown(file) {
  return fs.readFileSync(file, 'utf8');
}

function simpleMarkdownToBlocks(md) {
  // Very lightweight parser: identify headings (#), lists (-, •), and paragraphs
  const lines = md.split(/\r?\n/);
  const blocks = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'p', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  for (const line of lines) {
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushParagraph();
      blocks.push({ type: `h${h[1].length}`, text: h[2].trim() });
      continue;
    }
    const li = line.match(/^\s*[-•]\s+(.*)$/);
    if (li) {
      flushParagraph();
      blocks.push({ type: 'li', text: li[1].trim() });
      continue;
    }
    if (line.trim() === '---') {
      flushParagraph();
      blocks.push({ type: 'hr' });
      continue;
    }
    if (line.trim() === '') {
      flushParagraph();
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  return blocks;
}

function writePdf(blocks) {
  const doc = new PDFDocument({ margin: 50 });
  ensureDir(OUTPUT_DIR);
  const stream = fs.createWriteStream(OUTPUT_PDF);
  doc.pipe(stream);

  const writeHeading = (text, level) => {
    const sizes = { h1: 20, h2: 16, h3: 14 };
    const spacing = { h1: 14, h2: 10, h3: 8 };
    doc.moveDown(0.5).font('Helvetica-Bold').fontSize(sizes[level]).text(text, { align: 'left' });
    doc.moveDown(level === 'h1' ? 0.5 : 0.3);
  };

  const writeParagraph = (text) => {
    doc.font('Helvetica').fontSize(11).text(text, { align: 'left' }).moveDown(0.5);
  };

  const writeListItem = (text) => {
    doc.font('Helvetica').fontSize(11).text(`• ${text}`, { align: 'left', indent: 10 }).moveDown(0.1);
  };

  const writeHr = () => {
    const y = doc.y + 4;
    doc.moveTo(50, y).lineTo(doc.page.width - 50, y).strokeColor('#cccccc').lineWidth(1).stroke();
    doc.moveDown(0.5);
  };

  // Title
  doc.font('Helvetica-Bold').fontSize(22).text('Brief Technique – AEBL', { align: 'left' }).moveDown(0.5);
  doc.font('Helvetica').fontSize(10).fillColor('#555555').text(new Date().toLocaleDateString(), { align: 'left' }).fillColor('#000000');
  doc.moveDown(1);

  for (const b of blocks) {
    if (b.type === 'h1' || b.type === 'h2' || b.type === 'h3') writeHeading(b.text, b.type);
    else if (b.type === 'p') writeParagraph(b.text);
    else if (b.type === 'li') writeListItem(b.text);
    else if (b.type === 'hr') writeHr();
  }

  doc.end();
  return new Promise((resolve) => stream.on('finish', () => resolve(OUTPUT_PDF)));
}

(async () => {
  try {
    const md = readMarkdown(INPUT_MD);
    const blocks = simpleMarkdownToBlocks(md);
    const out = await writePdf(blocks);
    console.log(`\n✅ PDF généré: ${path.relative(ROOT, out)}\n`);
  } catch (e) {
    console.error('Erreur génération PDF:', e);
    process.exit(1);
  }
})();
