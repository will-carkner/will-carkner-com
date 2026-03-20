import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

// Configuration
const inputDir = './images' // Directory containing original images
const outputDir = './optimized' // Directory for optimized images
const targetWidth = 1200 // Max width in pixels
const quality = 80 // JPEG quality (0-100)

async function optimizeImages() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true })

    // Get all files from the input directory
    const files = await fs.readdir(inputDir)

    console.log(`Found ${files.length} files in ${inputDir}`)

    // Filter for JPEG files
    const jpegFiles = files.filter(
      (file) =>
        file.toLowerCase().endsWith('.jpeg') ||
        file.toLowerCase().endsWith('.jpg')
    )

    console.log(`Found ${jpegFiles.length} JPEG files to process`)

    // Process each JPEG file
    for (const file of jpegFiles) {
      const inputPath = path.join(inputDir, file)
      const outputPath = path.join(outputDir, file)

      console.log(`Processing: ${file}`)

      // Get image metadata
      const metadata = await sharp(inputPath).metadata()

      // Only resize if the image is larger than target width
      if (metadata.width > targetWidth) {
        await sharp(inputPath)
          .resize(targetWidth) // Resize to target width, maintain aspect ratio
          .jpeg({ quality }) // Set JPEG quality
          .toFile(outputPath)

        // Get file sizes for comparison
        const originalSize = (await fs.stat(inputPath)).size
        const optimizedSize = (await fs.stat(outputPath)).size
        const savingsPercent = (
          ((originalSize - optimizedSize) / originalSize) *
          100
        ).toFixed(2)

        console.log(
          `✅ ${file}: ${(originalSize / 1024).toFixed(2)}KB → ${(
            optimizedSize / 1024
          ).toFixed(2)}KB (${savingsPercent}% saved)`
        )
      } else {
        // If image is already smaller than target, just optimize it
        await sharp(inputPath).jpeg({ quality }).toFile(outputPath)

        const originalSize = (await fs.stat(inputPath)).size
        const optimizedSize = (await fs.stat(outputPath)).size
        const savingsPercent = (
          ((originalSize - optimizedSize) / originalSize) *
          100
        ).toFixed(2)

        console.log(
          `✅ ${file}: ${(originalSize / 1024).toFixed(2)}KB → ${(
            optimizedSize / 1024
          ).toFixed(2)}KB (${savingsPercent}% saved)`
        )
      }
    }

    console.log(`\n🎉 All done! Optimized images saved to ${outputDir}`)
  } catch (error) {
    console.error('Error optimizing images:', error)
  }
}

// Run the function
optimizeImages()
