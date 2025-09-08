# 🚀 Guia de Deploy na Vercel

Este guia irá te ajudar a fazer o deploy do seu Sistema de Gerenciamento de Estoque na Vercel.

## 📋 Pré-requisitos

- [x] Conta na [Vercel](https://vercel.com)
- [x] Conta no [GitHub](https://github.com) (ou GitLab/Bitbucket)
- [x] Banco de dados PostgreSQL (recomendado: [Neon](https://neon.tech) ou [PlanetScale](https://planetscale.com))

## 🗄️ 1. Configurar Banco de Dados

### Opção A: Neon (Recomendado)
1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a URL de conexão que será similar a:
   ```
   postgresql://usuario:senha@ep-exemplo-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### Opção B: PlanetScale
1. Acesse [planetscale.com](https://planetscale.com)
2. Crie uma conta gratuita
3. Crie um novo banco de dados
4. Obtenha a string de conexão

### Opção C: Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um projeto
3. Vá em Settings > Database
4. Copie a URI de conexão

## 📂 2. Preparar Repositório

### 2.1 Fazer commit das alterações
```bash
git add .
git commit -m "feat: preparar projeto para deploy na vercel"
git push origin main
```

### 2.2 Verificar arquivos importantes
Certifique-se que estes arquivos estão no seu repositório:
- [x] `vercel.json` - Configurações da Vercel
- [x] `.env.example` - Exemplo de variáveis de ambiente
- [x] `prisma/schema.prisma` - Schema do banco configurado para PostgreSQL

## 🚀 3. Deploy na Vercel

### 3.1 Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte sua conta do GitHub/GitLab
4. Selecione o repositório `stoke-app`
5. Clique em "Import"

### 3.2 Configurar Variáveis de Ambiente
Na página de configuração do projeto, adicione estas variáveis:

**Obrigatórias:**
```env
DATABASE_URL=postgresql://seu-usuario:sua-senha@seu-host/seu-database?sslmode=require
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXT_PUBLIC_APP_URL=https://seu-projeto.vercel.app
NODE_ENV=production
```

**Para gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Opcionais (para uploads):**
```env
CORS_ORIGIN=https://seu-projeto.vercel.app
```

### 3.3 Configurações de Build
- **Framework Preset:** Next.js
- **Build Command:** `npm run vercel-build` (ou deixe vazio)
- **Output Directory:** `.next` (ou deixe vazio)
- **Install Command:** `npm install` (ou deixe vazio)

### 3.4 Deploy
1. Clique em "Deploy"
2. Aguarde o build completar (pode demorar 2-5 minutos)

## ✅ 4. Verificações Pós-Deploy

### 4.1 Teste a Aplicação
1. Acesse a URL fornecida pela Vercel
2. Verifique se a página inicial carrega
3. Teste criar um produto
4. Verifique se as notificações funcionam

### 4.2 Verificar Logs
Se algo não funcionar:
1. Vá para o dashboard da Vercel
2. Clique no seu projeto
3. Vá em "Functions" ou "View Logs"
4. Analise os erros

### 4.3 Comandos úteis para debug
```bash
# Verificar se o Prisma está funcionando
npx prisma studio

# Gerar cliente Prisma novamente
npx prisma generate

# Aplicar mudanças no banco
npx prisma db push
```

## 🔧 5. Problemas Comuns

### Erro de Build
**Problema:** Build falha com erro do Prisma
**Solução:** Verifique se `DATABASE_URL` está configurada corretamente

### Erro 500 nas APIs
**Problema:** APIs retornam erro 500
**Solução:** 
1. Verifique logs na Vercel
2. Confirme se todas as variáveis de ambiente estão configuradas
3. Teste conexão com banco de dados

### Upload de Imagens Não Funciona
**Problema:** Upload de imagens falha em produção
**Solução:** 
1. Configure serviço de armazenamento (AWS S3, Cloudinary)
2. Ou use Vercel Blob Storage

## 🔄 6. Atualizações e Re-deploy

### Deploy Automático
Toda vez que você fizer push para `main`, a Vercel fará deploy automaticamente.

### Deploy Manual
1. No dashboard da Vercel
2. Clique em "Deployments"
3. Clique em "Redeploy"

## 📱 7. Domínio Personalizado (Opcional)

1. Vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções da Vercel
4. Atualize `NEXTAUTH_URL` e `NEXT_PUBLIC_APP_URL`

## 🔐 8. Segurança em Produção

### Variáveis Importantes
- Nunca commite arquivos `.env` 
- Use senhas fortes para `NEXTAUTH_SECRET`
- Configure `CORS_ORIGIN` para sua URL específica

### Headers de Segurança
O projeto já inclui headers básicos de segurança no `next.config.ts`.

## 📊 9. Monitoramento

### Vercel Analytics
1. Vá em "Settings" > "Analytics"
2. Ative o Vercel Analytics
3. Monitore performance e erros

### Logs
- Use `console.log` com moderação em produção
- Configure alertas para erros críticos

## 🆘 10. Suporte

Se precisar de ajuda:
1. ✅ Verifique os logs da Vercel
2. ✅ Confirme variáveis de ambiente  
3. ✅ Teste conexão com banco de dados
4. ✅ Verifique se o build local funciona

---

## 🎉 Pronto! 

Seu Sistema de Gerenciamento de Estoque agora está rodando em produção na Vercel!

**URL de exemplo:** `https://stock-app-123456.vercel.app`

Lembre-se de:
- ✅ Fazer backup regular do banco de dados
- ✅ Monitorar performance
- ✅ Manter dependências atualizadas
- ✅ Testar mudanças em ambiente de staging primeiro
