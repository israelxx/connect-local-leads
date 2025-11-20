# 🚀 Pro Connect - Landing Page + Dashboard Administrativo

> Projeto otimizado para deploy em **dois domínios separados** mantendo conexão com o Lovable Cloud

## 📋 Visão Geral

Este projeto está estruturado para permitir deploys independentes:

- **Domínio Principal** (`seudominio.com`): Landing page com formulários de contato
- **Subdomínio Admin** (`admin.seudominio.com`): Dashboard administrativo protegido por login

Ambos compartilham o **mesmo banco de dados** via Lovable Cloud.

## 🏗️ Arquitetura

```
┌─────────────────────────────┐
│  Domínio Principal          │
│  seudominio.com             │
│  (Landing Page)             │
└──────────┬──────────────────┘
           │
           ├──────────────────────────┐
           ▼                          ▼
    ┌─────────────┐          ┌─────────────┐
    │ Formulários │          │ Edge        │
    │ de Contato  │──────────│ Functions   │
    └─────────────┘          └─────────────┘
           │                          │
           └──────────┬───────────────┘
                      ▼
            ┌──────────────────┐
            │  Lovable Cloud   │
            │  (Supabase)      │
            └────────┬─────────┘
                     │
           ┌─────────┴──────────┐
           ▼                    ▼
    ┌─────────────┐      ┌─────────────┐
    │ Banco de    │      │  Storage    │
    │ Dados       │      │  de Emails  │
    └─────────────┘      └─────────────┘
           │
           │
           ▼
┌──────────────────────────────┐
│  Subdomínio Admin            │
│  admin.seudominio.com        │
│  (Dashboard)                 │
└──────────────────────────────┘
```

## 🚀 Deploy Rápido

### 1️⃣ Deploy do Domínio Principal (Landing Page)

```bash
# Configure o arquivo .env
VITE_APP_MODE=public

# Build
npm install
npm run build

# Deploy a pasta dist/ para seudominio.com
```

### 2️⃣ Deploy do Subdomínio Admin (Dashboard)

```bash
# Configure o arquivo .env
VITE_APP_MODE=admin

# Build
npm install
npm run build

# Deploy a pasta dist/ para admin.seudominio.com
```

## 📖 Documentação Completa

Para instruções detalhadas de deploy, configuração de servidor, troubleshooting e mais:

👉 **[Leia o DEPLOY.md](./DEPLOY.md)**

## 🛠️ Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento (todas as rotas disponíveis)
npm run dev

# Acesse: http://localhost:8080
```

### Testar modos específicos localmente:

```bash
# Testar versão pública (landing page)
VITE_APP_MODE=public npm run dev

# Testar versão admin (dashboard)
VITE_APP_MODE=admin npm run dev
```

## 🔧 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Autenticação**: Supabase Auth
- **Email**: Resend (via Edge Functions)
- **Deploy**: Qualquer host estático (Vercel, Netlify, cPanel, etc.)

## 📁 Estrutura do Projeto

```
src/
├── App.tsx              # Roteador principal (seleciona modo)
├── AppPublic.tsx        # Versão pública (landing page)
├── AppAdmin.tsx         # Versão admin (dashboard)
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── Login.tsx        # Página de login
│   └── Dashboard.tsx    # Dashboard administrativo
├── components/          # Componentes reutilizáveis
└── integrations/
    └── supabase/        # Configuração do Lovable Cloud

supabase/
└── functions/
    └── send-lead-email/ # Edge function para envio de emails
```

## 🔐 Segurança

- ✅ Row Level Security (RLS) habilitado
- ✅ Autenticação obrigatória no dashboard
- ✅ Secrets armazenados com segurança no Lovable Cloud
- ✅ Edge Functions protegidas
- ⚠️ **IMPORTANTE**: Revise as políticas RLS após o deploy (veja relatório de segurança)

## 🐛 Troubleshooting

### Problema comum: "Failed to fetch"
**Solução**: Verifique se as variáveis `VITE_SUPABASE_*` estão corretas no `.env`

### Dashboard não carrega
**Solução**: Confirme que `VITE_APP_MODE=admin` no deploy do subdomínio

Para mais soluções, consulte [DEPLOY.md](./DEPLOY.md#troubleshooting)

## 📞 Suporte

- 📧 Email: pro.conectt@gmail.com
- 📱 WhatsApp: Disponível na landing page
- 📚 Documentação: [DEPLOY.md](./DEPLOY.md)

## 📝 Licença

Este projeto foi desenvolvido para Pro Connect.

---

**🎯 Próximos Passos:**

1. Configure seus domínios (principal e subdomínio)
2. Leia o [DEPLOY.md](./DEPLOY.md) para instruções detalhadas
3. Faça o build de cada versão
4. Deploy!

**💡 Dica**: Use o arquivo `.env.example` como referência para configurar suas variáveis de ambiente.
