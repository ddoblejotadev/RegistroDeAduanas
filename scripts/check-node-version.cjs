const [major, minor, patch] = process.versions.node.split('.').map(Number)
const required = [14, 18, 0]

const isTooOld =
  major < required[0] ||
  (major === required[0] && minor < required[1]) ||
  (major === required[0] && minor === required[1] && patch < required[2])

if (isTooOld) {
  console.error(
    `\nNode.js ${required.join('.')} o superior es requerido. Encontrado: ${process.versions.node}.\nInstala una versión compatible antes de ejecutar npm install o npm run dev.\n`
  )
  process.exit(1)
}
