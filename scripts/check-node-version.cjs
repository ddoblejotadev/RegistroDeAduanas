const { execSync } = require('child_process')
const os = require('os')

const [major] = process.versions.node.split('.').map(Number)
const requiredMajor = 18

if (major >= requiredMajor) {
  // Node version OK — salir silenciosamente
  process.exit(0)
}

// --- ERROR: Node muy viejo ---
console.error(`\n\x1b[31m✖ Node.js ${requiredMajor}+ requerido. Encontrado: ${process.versions.node}\x1b[0m\n`)
console.error(`El proyecto necesita Node.js ${requiredMajor} o superior.`)
console.error(`Tus dependencias (framer-motion, @tanstack/react-query, etc.) no funcionan en versiones viejas.\n`)

// Detectar si hay múltiples instalaciones de Node (común en PCs compartidas)
try {
  const isWin = os.platform() === 'win32'
  const cmd = isWin ? 'where node' : 'which node'
  const output = execSync(cmd, { encoding: 'utf8', timeout: 5000 }).trim()
  const paths = output.split(/\r?\n/).filter(p => p)

  if (paths.length > 1) {
    console.error(`\x1b[33m⚠ Se encontraron múltiples instalaciones de Node:\x1b[0m`)
    paths.forEach((p, i) => {
      const marker = i === 0 ? '→ activa' : '  obsoleta'
      console.error(`   ${marker}: ${p}`)
    })
    console.error(`\nLa terminal está usando: \x1b[36m${process.execPath}\x1b[0m`)
    console.error(`\nEsto pasa cuando instalaste Node varias veces sin desinstalar la anterior.`)
    console.error(`\nPara arreglarlo:`)
    if (isWin) {
      console.error(`   1. Abrí "Agregar o quitar programas" y desinstalá TODAS las versiones de Node.js`)
      console.error(`   2. Descargá e instalá nvm-windows (búscalo en GitHub)`)
      console.error(`   3. En PowerShell: nvm install ${requiredMajor}  &&  nvm use ${requiredMajor}`)
      console.error(`   4. Verificá con: node -v`)
    } else {
      console.error(`   1. Desinstalá Node con el gestor de paquetes de tu sistema`)
      console.error(`   2. Instalá nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash`)
      console.error(`   3. nvm install ${requiredMajor}`)
    }
    process.exit(1)
  }
} catch {
  // "where node" puede fallar si Node no está en PATH, pero si llegamos acá es que sí está
}

console.error(`\nInstalá Node.js ${requiredMajor}:\n`)
console.error(`   Opción A (recomendada) — Usá nvm:`)
console.error(`      nvm install ${requiredMajor}`)
console.error(`      nvm use ${requiredMajor}`)
console.error(`\n   Opción B — Descargá el instalador desde https://nodejs.org/`)
console.error(`      Importante: desinstalá primero las versiones viejas de Node.js`)
console.error(`      desde "Agregar o quitar programas" antes de instalar la nueva.\n`)
process.exit(1)
