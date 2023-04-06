import fs from 'fs'
import path from 'path'

const DOCS = [
  '.doc',
  '.docx',
  '.odt',
  '.pdf',
  '.rtf',
  '.txt',
  '.wpd',
  '.xls',
  '.xlsx',
  '.ods',
  '.csv',
  '.ppt',
  '.pptx',
  '.odp',
]

const IMAGES = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.tiff',
  '.tif',
  '.svg',
  '.psd',
  '.ai',
  '.eps',
  '.indd',
  '.webp',
  '.ico',
  '.svgz',
  '.heic',
]
const AUDIO = ['.mp3', '.wav', '.aac', '.wma', '.ogg']
const VIDEO = ['.mp4', '.avi', '.mov', '.wmv', '.flv']
const ARCHIVES = ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2']

export async function execute(receivedPath: string) {
  if (fs.existsSync(receivedPath)) {
    const files = fs.readdirSync(receivedPath)

    const docsPath = path.join(receivedPath, 'Docs')
    const imagesPath = path.join(receivedPath, 'Images')
    const audiosPath = path.join(receivedPath, 'Audios')
    const videosPath = path.join(receivedPath, 'Videos')
    const archivesPath = path.join(receivedPath, 'Archives')
    const othersPath = path.join(receivedPath, 'Others')

    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath)
    }
    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath)
    }
    if (!fs.existsSync(audiosPath)) {
      fs.mkdirSync(audiosPath)
    }
    if (!fs.existsSync(videosPath)) {
      fs.mkdirSync(videosPath)
    }
    if (!fs.existsSync(archivesPath)) {
      fs.mkdirSync(archivesPath)
    }
    if (!fs.existsSync(othersPath)) {
      fs.mkdirSync(othersPath)
    }

    files.forEach((file) => {
      const sourcePath = path.join(receivedPath, file)

      const ext = path.extname(file)

      if (!ext) {
        const stat = fs.statSync(sourcePath)

        const paths = [
          'Videos',
          'Images',
          'Audios',
          'Others',
          'Archives',
          'Docs',
        ]

        if (stat.isDirectory()) {
          if (!paths.includes(file)) {
            const targetPath = path.join(othersPath, file)
            fs.renameSync(sourcePath, targetPath)
            return
          }
          return
        }
      }

      if (DOCS.includes(ext)) {
        const targetPath = path.join(docsPath, file)
        fs.renameSync(sourcePath, targetPath)
        return
      }

      if (IMAGES.includes(ext)) {
        const targetPath = path.join(imagesPath, file)
        fs.renameSync(sourcePath, targetPath)
        return
      }

      if (AUDIO.includes(ext)) {
        const targetPath = path.join(audiosPath, file)
        fs.renameSync(sourcePath, targetPath)
        return
      }

      if (VIDEO.includes(ext)) {
        const targetPath = path.join(videosPath, file)
        fs.renameSync(sourcePath, targetPath)
        return
      }

      if (ARCHIVES.includes(ext)) {
        const targetPath = path.join(archivesPath, file)
        fs.renameSync(sourcePath, targetPath)
        return
      }

      const targetPath = path.join(othersPath, file)
      fs.renameSync(sourcePath, targetPath)
    })
  }
}
