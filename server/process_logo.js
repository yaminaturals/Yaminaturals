const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:\\Users\\Shravan Prajapati\\.gemini\\antigravity\\brain\\0511de47-1b62-4353-ba3c-18879d3502c6\\.user_uploaded\\media_1788282581011.png';
const publicDir = 'C:\\Users\\Shravan Prajapati\\.gemini\\antigravity\\scratch\\yami-naturals\\client\\public';
const assetsDir = 'C:\\Users\\Shravan Prajapati\\.gemini\\antigravity\\scratch\\yami-naturals\\client\\src\\assets';

async function processLogo() {
  console.log('Reading input image...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

  // Get raw uncompressed RGBA pixel buffer
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  console.log(`Channels: ${channels}, Total pixels: ${width * height}`);

  // 1. Create transparent green logo (for white/light backgrounds)
  const greenData = Buffer.from(data);
  // 2. Create transparent white/light logo (for dark backgrounds)
  const whiteData = Buffer.from(data);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Compute perceived luminance / whiteness
    // White background is around (250-255, 250-255, 250-255)
    // Dark green logo is around (15-35, 75-105, 45-70)
    const minVal = Math.min(r, g, b);
    const avgVal = (r + g + b) / 3;

    // Threshold calculation for crisp anti-aliasing
    let alpha = 0;
    if (minVal < 248) {
      // Linear mapping from 248 down to 100 for smooth anti-aliased edge
      if (minVal > 180) {
        alpha = Math.round(255 * (248 - minVal) / (248 - 180));
      } else {
        alpha = 255;
      }
    }

    // 1. Transparent Green Logo
    if (alpha === 0) {
      greenData[i] = 0;
      greenData[i + 1] = 0;
      greenData[i + 2] = 0;
      greenData[i + 3] = 0;
    } else {
      // Keep rich deep botanical green
      // Remove white blend component from edges
      const factor = alpha / 255;
      const cleanR = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - factor)) / factor)));
      const cleanG = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - factor)) / factor)));
      const cleanB = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - factor)) / factor)));

      greenData[i] = cleanR;
      greenData[i + 1] = cleanG;
      greenData[i + 2] = cleanB;
      greenData[i + 3] = alpha;
    }

    // 2. Transparent White/Gold Logo (for dark background)
    if (alpha === 0) {
      whiteData[i] = 0;
      whiteData[i + 1] = 0;
      whiteData[i + 2] = 0;
      whiteData[i + 3] = 0;
    } else {
      // Make lettering crisp white/ivory (#ffffff) with smooth alpha
      whiteData[i] = 255;
      whiteData[i + 1] = 255;
      whiteData[i + 2] = 255;
      whiteData[i + 3] = alpha;
    }
  }

  // Trim transparent borders for perfect framing
  const greenPng = await sharp(greenData, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, quality: 100 })
    .trim()
    .toBuffer();

  const whitePng = await sharp(whiteData, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, quality: 100 })
    .trim()
    .toBuffer();

  // Save to public and assets
  fs.writeFileSync(path.join(publicDir, 'logo.png'), greenPng);
  fs.writeFileSync(path.join(publicDir, 'logo-white.png'), whitePng);
  fs.writeFileSync(path.join(assetsDir, 'logo.png'), greenPng);
  fs.writeFileSync(path.join(assetsDir, 'logo-white.png'), whitePng);

  console.log('✅ Successfully generated HD transparent logo.png and logo-white.png!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
