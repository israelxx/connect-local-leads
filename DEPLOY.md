# 🚀 Guia de Deploy - Pro Connect

Este projeto está otimizado para deploy em **dois domínios separados** mantendo a mesma conexão com o Lovable Cloud.

## 📋 Arquitetura

```
Domínio Principal (seudominio.com)
└── Landing Page + Formulários de Contato

Subdomínio Admin (admin.seudominio.com)
└── Login + Dashboard Administrativo

         ↓↓↓
    Lovable Cloud
   (Banco de Dados)
```

## 🔧 Configuração de Variáveis de Ambiente

### Para AMBOS os deploys, você precisa das mesmas credenciais:

Crie um arquivo `.env` em cada deploy com:

```env
# Credenciais do Lovable Cloud (IGUAIS em ambos os deploys)
VITE_SUPABASE_URL=https://xmrxciqmuprjdmgcaphf.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcnhjaXFtdXByamRtZ2NhcGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDQ1MzEsImV4cCI6MjA3ODEyMDUzMX0.96m7duP75MzaCbeCmCPQGgSMVE6rn9HtCN3Y278brX0
VITE_SUPABASE_PROJECT_ID=xmrxciqmuprjdmgcaphf

# Modo do aplicativo (DIFERENTE em cada deploy)
VITE_APP_MODE=public    # Para domínio principal
# OU
VITE_APP_MODE=admin     # Para subdomínio administrativo
```

---

## 🌐 Deploy 1: Domínio Principal (Landing Page)

### Arquivos necessários:
- `src/AppPublic.tsx` ✅
- `src/pages/Index.tsx` ✅
- `src/components/*` (todos os componentes da landing page) ✅

### Passos:

1. **Configure o arquivo `.env`:**
   ```env
   VITE_SUPABASE_URL=https://xmrxciqmuprjdmgcaphf.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcnhjaXFtdXByamRtZ2NhcGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDQ1MzEsImV4cCI6MjA3ODEyMDUzMX0.96m7duP75MzaCbeCmCPQGgSMVE6rn9HtCN3Y278brX0
   VITE_SUPABASE_PROJECT_ID=xmrxciqmuprjdmgcaphf
   VITE_APP_MODE=public
   ```

2. **Faça o build:**
   ```bash
   npm install
   npm run build
   ```

3. **Deploy:**
   - Suba o conteúdo da pasta `dist/` para seu servidor
   - Configure o domínio: `seudominio.com`

### O que estará disponível:
- ✅ Landing page completa
- ✅ Formulários de contato funcionando
- ✅ Envio de leads para o banco de dados
- ❌ Login/Dashboard (não incluídos)

---

## 🔐 Deploy 2: Subdomínio Administrativo (Dashboard)

### Arquivos necessários:
- `src/AppAdmin.tsx` ✅
- `src/pages/Login.tsx` ✅
- `src/pages/Dashboard.tsx` ✅
- `src/components/LeadFormModal.tsx` (usado no dashboard) ✅

### Passos:

1. **Configure o arquivo `.env`:**
   ```env
   VITE_SUPABASE_URL=https://xmrxciqmuprjdmgcaphf.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcnhjaXFtdXByamRtZ2NhcGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDQ1MzEsImV4cCI6MjA3ODEyMDUzMX0.96m7duP75MzaCbeCmCPQGgSMVE6rn9HtCN3Y278brX0
   VITE_SUPABASE_PROJECT_ID=xmrxciqmuprjdmgcaphf
   VITE_APP_MODE=admin
   ```

2. **Faça o build:**
   ```bash
   npm install
   npm run build
   ```

3. **Deploy:**
   - Suba o conteúdo da pasta `dist/` para seu servidor
   - Configure o subdomínio: `admin.seudominio.com` ou `dashboard.seudominio.com`

### O que estará disponível:
- ✅ Página de login (`/login`)
- ✅ Dashboard administrativo (`/dashboard`)
- ✅ Acesso aos dados do banco de dados
- ❌ Landing page (não incluída)

---

## 🔗 Como Funciona a Conexão

Ambos os deploys usam **as mesmas credenciais** do Lovable Cloud:

```
Landing Page (seudominio.com)
        ↓
   [Formulário de Contato]
        ↓
   Salva Lead no Banco
        ↓
    Lovable Cloud
        ↓
Dashboard (admin.seudominio.com)
        ↓
   [Visualiza Leads]
```

**Fluxo de dados:**
1. Usuário preenche formulário em `seudominio.com`
2. Dados são salvos no Lovable Cloud (Supabase)
3. Admin acessa `admin.seudominio.com`
4. Faz login
5. Visualiza todos os leads no dashboard

---

## 🛠️ Desenvolvimento Local

Para testar localmente **todas as rotas** juntas:

```bash
# Não defina VITE_APP_MODE ou deixe vazio
npm run dev
```

Isso carregará `AppPublic.tsx` por padrão, mas você pode acessar:
- `http://localhost:8080/` - Landing page
- Para testar o admin localmente, altere temporariamente `VITE_APP_MODE=admin`

---

## ⚙️ Configuração de Servidor (NGINX/Apache)

### NGINX (Recomendado):

```nginx
# Domínio principal
server {
    server_name seudominio.com www.seudominio.com;
    root /var/www/public;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Subdomínio admin
server {
    server_name admin.seudominio.com;
    root /var/www/admin;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache (.htaccess):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📦 Estrutura de Pastas para Deploy

```
/var/www/
├── public/              # Deploy do domínio principal
│   ├── dist/
│   └── .env            # VITE_APP_MODE=public
│
└── admin/              # Deploy do subdomínio
    ├── dist/
    └── .env            # VITE_APP_MODE=admin
```

---

## 🔐 Segurança

### ⚠️ IMPORTANTE:

1. **Credenciais do Lovable Cloud:**
   - As chaves `VITE_SUPABASE_*` são **públicas** (prefixo `VITE_`)
   - Elas podem ser expostas no código do cliente
   - A segurança é garantida pelas **RLS Policies** do banco de dados

2. **Proteção do Dashboard:**
   - O dashboard requer autenticação obrigatória
   - Dados são protegidos por Row Level Security (RLS)
   - Apenas usuários autenticados podem acessar

3. **Secrets Privados:**
   - `RESEND_API_KEY` está armazenado com segurança no Lovable Cloud
   - Nunca será exposto no código do cliente
   - Usado apenas nas Edge Functions (servidor)

---

## 🐛 Troubleshooting

### Problema: "Failed to fetch" ao enviar formulário

**Solução:** Verifique se as variáveis de ambiente estão corretas em `.env`

### Problema: Dashboard não carrega dados

**Solução:** 
1. Confirme que `VITE_APP_MODE=admin` no deploy do subdomínio
2. Verifique se fez login corretamente
3. Teste a conexão com o banco de dados

### Problema: Formulário não envia email

**Solução:**
1. Verifique se a Edge Function `send-lead-email` está ativa no Lovable Cloud
2. Confirme que o `RESEND_API_KEY` está configurado nos secrets

---

## 📞 Suporte

Dúvidas? Entre em contato:
- 📧 Email: pro.conectt@gmail.com
- 📱 WhatsApp: Clique no botão da landing page

---

## ✅ Checklist de Deploy

### Domínio Principal (seudominio.com):
- [ ] Arquivo `.env` configurado com `VITE_APP_MODE=public`
- [ ] Build realizado: `npm run build`
- [ ] Pasta `dist/` enviada para o servidor
- [ ] Domínio configurado e apontando corretamente
- [ ] Testado: formulário de contato funciona
- [ ] Testado: leads são salvos no banco

### Subdomínio Admin (admin.seudominio.com):
- [ ] Arquivo `.env` configurado com `VITE_APP_MODE=admin`
- [ ] Build realizado: `npm run build`
- [ ] Pasta `dist/` enviada para o servidor
- [ ] Subdomínio configurado e apontando corretamente
- [ ] Testado: login funciona
- [ ] Testado: dashboard carrega os leads
- [ ] Testado: dados aparecem em tempo real

---

**🎉 Pronto! Agora você tem dois deploys independentes compartilhando o mesmo banco de dados!**
