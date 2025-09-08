#!/usr/bin/env node

/**
 * Script de inicialização do Stock Management App
 * Este script ajuda a configurar o projeto pela primeira vez
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Inicializando Stock Management App...\n')

// Verificar se o arquivo .env existe
const envPath = path.join(__dirname, '.env')
const envExamplePath = path.join(__dirname, '.env.example')

if (!fs.existsSync(envPath)) {
  console.log('📝 Criando arquivo .env...')
  try {
    fs.copyFileSync(envExamplePath, envPath)
    console.log('✅ Arquivo .env criado com sucesso!')
    console.log('⚠️  IMPORTANTE: Edite o arquivo .env com suas configurações\n')
  } catch (error) {
    console.log('❌ Erro ao criar arquivo .env:', error.message)
  }
} else {
  console.log('✅ Arquivo .env já existe!\n')
}

// Instalar dependências
console.log('📦 Instalando dependências...')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Dependências instaladas com sucesso!\n')
} catch (error) {
  console.log('❌ Erro ao instalar dependências:', error.message)
  process.exit(1)
}

// Gerar cliente Prisma
console.log('🔧 Gerando cliente Prisma...')
try {
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✅ Cliente Prisma gerado com sucesso!\n')
} catch (error) {
  console.log('❌ Erro ao gerar cliente Prisma:', error.message)
}

// Criar diretório de uploads se não existir
const uploadsDir = path.join(__dirname, 'public', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  console.log('📁 Criando diretório de uploads...')
  try {
    fs.mkdirSync(uploadsDir, { recursive: true })
    // Criar arquivo .gitkeep para manter o diretório no git
    fs.writeFileSync(path.join(uploadsDir, '.gitkeep'), '')
    console.log('✅ Diretório de uploads criado!\n')
  } catch (error) {
    console.log('❌ Erro ao criar diretório de uploads:', error.message)
  }
}

console.log('🎉 Inicialização concluída!\n')
console.log('📋 Próximos passos:')
console.log('1. ✏️  Edite o arquivo .env com suas configurações')
console.log('2. 🗄️  Configure sua DATABASE_URL no .env')
console.log('3. 🚀 Execute: npm run migrate (para desenvolvimento)')
console.log('4. 🔧 Execute: npm run dev (para iniciar o servidor)')
console.log('\n📖 Para deploy na Vercel, veja: DEPLOY.md')
console.log('\n✨ Happy coding!')
