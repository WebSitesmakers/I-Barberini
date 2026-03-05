import path from 'path';
import sharp from 'sharp';
import fsPromises from 'fs/promises';

const ASSETS_DIR = path.resolve('./src/assets');

async function processDirectory(dirPath) {
    try {
        const entries = await fsPromises.readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                await processDirectory(fullPath);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                const isImage = ['.jpg', '.jpeg', '.png'].includes(ext);
                const isLogo = entry.name.includes("logo");

                if (isImage && !isLogo) {
                    const newPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                    try {
                        const stats = await fsPromises.stat(fullPath);
                        console.log(`Compressing ${fullPath} (${(stats.size/1024/1024).toFixed(2)} MB)...`);
                        
                        const img = sharp(fullPath);
                        const metadata = await img.metadata();
                        
                        let transformedImg = img;
                        if (metadata.width > 1920) {
                             transformedImg = img.resize({ width: 1920, withoutEnlargement: true });
                        }

                        await transformedImg
                            .webp({ quality: 80, effort: 4 })
                            .toFile(newPath);
                            
                        // Remove original file
                        await fsPromises.unlink(fullPath);

                        console.log(`Done -> .webp`);
                    } catch (err) {
                        console.error(`Error processing ${fullPath}`, err);
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Failed to start on: ${dirPath}`, err);
    }
}

console.log('Starting mass WebP optimization...');
processDirectory(ASSETS_DIR).then(() => console.log('All done!'));
