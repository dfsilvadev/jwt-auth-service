# Auth JWT API

API de autenticação com JWT usando Node.js, TypeScript, PostgreSQL, Prisma, Docker e Docker Compose.

## 🚀 Stack Tecnológica

- **Node.js** + **TypeScript**
- **PostgreSQL** (banco de dados)
- **Prisma** (ORM)
- **Docker** + **Docker Compose**
- **Zod** (validação)
- **pnpm** (gerenciador de pacotes)

## 📋 Pré-requisitos

- Node.js 20+
- pnpm 10+
- Docker e Docker Compose

## 🛠️ Configuração Inicial

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_jwt?schema=public
```

### 3. Iniciar PostgreSQL com Docker

```bash
# Apenas PostgreSQL (para desenvolvimento)
pnpm docker:dev

# Ou todos os serviços (app + PostgreSQL)
pnpm docker:up
```

### 4. Configurar Prisma

```bash
# Gerar Prisma Client
pnpm prisma:generate

# Executar migrações
pnpm prisma:migrate
```

### 5. Iniciar aplicação

```bash
# Desenvolvimento
pnpm start:dev

# Produção
pnpm build
pnpm start
```

## 📜 Scripts Disponíveis

### Desenvolvimento

- `pnpm start:dev` - Inicia em modo desenvolvimento com hot reload
- `pnpm build` - Compila TypeScript para JavaScript
- `pnpm start` - Inicia aplicação em produção
- `pnpm type:check` - Verifica tipos TypeScript

### Prisma

- `pnpm prisma:generate` - Gera Prisma Client
- `pnpm prisma:migrate` - Cria e aplica migrações
- `pnpm prisma:migrate:deploy` - Aplica migrações em produção
- `pnpm prisma:studio` - Abre Prisma Studio (GUI)
- `pnpm prisma:format` - Formata schema Prisma

### Docker

- `pnpm docker:up` - Inicia todos os serviços
- `pnpm docker:down` - Para todos os serviços
- `pnpm docker:build` - Constrói imagens Docker
- `pnpm docker:dev` - Inicia apenas PostgreSQL para desenvolvimento

### Qualidade de Código

- `pnpm lint` - Executa ESLint
- `pnpm lint:fix` - Corrige problemas do ESLint
- `pnpm format` - Formata código com Prettier
- `pnpm format:check` - Verifica formatação

## 🐳 Docker

### Desenvolvimento

Para desenvolvimento, use apenas o PostgreSQL:

```bash
pnpm docker:dev
```

Isso inicia apenas o PostgreSQL, permitindo que você rode a aplicação localmente.

### Produção

Para rodar tudo com Docker:

```bash
# Construir e iniciar
pnpm docker:build
pnpm docker:up

# Parar
pnpm docker:down
```

## 📁 Estrutura do Projeto

```
src/
├── application/          # Camada de aplicação
│   ├── config/          # Configurações
│   ├── errors/          # Tratamento de erros
│   └── use-cases/       # Casos de uso
├── core/                # Entidades e contratos
│   ├── entities/        # Entidades de domínio
│   └── repositories/    # Interfaces de repositórios
├── infra/               # Infraestrutura
│   ├── db/             # Banco de dados
│   │   └── prisma/     # Cliente Prisma
│   └── logger/         # Sistema de logs
└── interface/          # Interfaces externas
    └── http/           # HTTP (controllers, routes, middlewares)
```

## 🔒 Segurança

- ✅ Validação de variáveis de ambiente com Zod
- ✅ JWT com secret mínimo de 32 caracteres
- ✅ Hash de senhas configurável
- ✅ CORS configurável
- ✅ Type safety com TypeScript

## 📝 Próximos Passos

1. Implementar casos de uso (register, authenticate)
2. Criar controllers e rotas
3. Implementar middlewares de autenticação
4. Adicionar testes
5. Configurar CI/CD

## 📚 Documentação

- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Docker Docs](https://docs.docker.com/)

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

ISC
