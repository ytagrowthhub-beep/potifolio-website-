// Script to generate favicon files from logo.png
// Run with: node scripts/generate-favicons.js

const fs = require('fs')
const path = require('path')

// This script requires sharp to be installed
// npm install sharp --save-dev

async function generateFavicons() {
  try {
    const sharp = require('sharp')
    const publicDir = path.join(process.cwd(), 'public')
    const logoPath = path.join(publicDir, 'logo.png')

    if (!fs.existsSync(logoPath)) {
      console.error('❌ logo.png not found in public folder')
      process.exit(1)
    }

    console.log('🔄 Generating favicon files from logo.png...')

    // Generate favicon-16x16.png
    await sharp(logoPath)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'))
    console.log('✅ Created favicon-16x16.png')

    // Generate apple-touch-icon.png (180x180)
    await sharp(logoPath)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'))
    console.log('✅ Created apple-touch-icon.png')

    // Generate favicon.ico (32x32)
    await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'))
    console.log('✅ Created favicon-32x32.png')

    console.log('\n✨ Favicon generation complete!')
    console.log('Note: favicon.ico needs to be created manually or use an online converter')
    console.log('Visit: https://realfavicongenerator.net/ to create favicon.ico from favicon-32x32.png')
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('📦 Installing sharp...')
      console.log('Please run: npm install sharp --save-dev')
      console.log('Then run this script again')
    } else {
      console.error('❌ Error:', error.message)
    }
  }
}

generateFavicons()
