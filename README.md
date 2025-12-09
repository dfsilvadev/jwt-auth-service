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
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/jwt-auth-service?schema=public
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

## 🏗️ Arquitetura

Este projeto segue os princípios de **Clean Architecture** e **SOLID**, organizando o código em camadas bem definidas:

### 📁 Estrutura do Projeto

```
src/
├── domain/                          # 🟢 CAMADA DE DOMÍNIO (Núcleo)
│   ├── entities/                    # Entidades de domínio
│   │   ├── account.entity.ts        # Entidade Account
│   │   └── controller.interface.ts # Interface Controller
│   ├── repositories/                # Interfaces de repositórios
│   │   └── account.repository.ts   # Contrato AccountRepository
│   ├── services/                    # Interfaces de serviços de domínio
│   │   ├── token.service.ts        # Interface TokenService
│   │   └── password-hasher.service.ts # Interface PasswordHasher
│   └── errors/                      # Erros de domínio
│       ├── domain-error.ts         # Classe base de erros
│       ├── invalid-credentials.error.ts
│       └── account-already-exists.error.ts
│
├── application/                      # 🟡 CAMADA DE APLICAÇÃO
│   ├── use-cases/                    # Casos de uso (orquestração)
│   │   ├── auth/
│   │   │   ├── sign-in.use-case.ts
│   │   │   └── sign-up.use-case.ts
│   │   └── accounts/
│   │       └── list-accounts.use-case.ts
│   └── dtos/                         # Data Transfer Objects
│       ├── auth/
│       │   ├── sign-in.dto.ts
│       │   └── sign-up.dto.ts
│       └── accounts/
│           └── list-accounts.dto.ts
│
├── infrastructure/                   # 🔴 CAMADA DE INFRAESTRUTURA
│   ├── persistence/                  # Implementações de persistência
│   │   └── prisma/
│   │       ├── repositories/
│   │       │   └── prisma-account.repository.ts
│   │       └── prisma-client.ts
│   ├── security/                     # Implementações de segurança
│   │   ├── jwt-token.service.ts     # Implementa TokenService
│   │   └── bcrypt-password-hasher.service.ts
│   ├── logger/                      # Sistema de logging
│   │   ├── console-logger.ts
│   │   └── logger.interface.ts
│   └── factories/                    # Factories para injeção de dependências
│       ├── make-account-repository.ts
│       ├── make-token-service.ts
│       └── make-password-hasher.ts
│
├── presentation/                     # 🔵 CAMADA DE APRESENTAÇÃO
│   ├── http/                        # HTTP (Express)
│   │   ├── controllers/             # Controllers
│   │   │   ├── auth/
│   │   │   │   ├── sign-in.controller.ts
│   │   │   │   └── sign-up.controller.ts
│   │   │   ├── accounts/
│   │   │   │   └── list-accounts.controller.ts
│   │   │   └── health/
│   │   │       └── health-check.controller.ts
│   │   ├── middlewares/             # Middlewares HTTP
│   │   │   └── authentication.middleware.ts
│   │   ├── routes/                  # Rotas
│   │   │   ├── auth.routes.ts
│   │   │   ├── accounts.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   └── index.ts
│   │   ├── validators/              # Validação de entrada (Zod)
│   │   │   ├── sign-in.validator.ts
│   │   │   └── sign-up.validator.ts
│   │   ├── errors/                   # Erros HTTP
│   │   │   ├── http-error.mapper.ts
│   │   │   └── constants/error-messages.ts
│   │   ├── adapters/                # Adaptadores Express
│   │   │   ├── route.adapter.ts
│   │   │   └── middleware.adapter.ts
│   │   └── types/                   # Tipos HTTP
│   │       └── http.types.ts
│   ├── server/                      # Configuração do servidor
│   │   ├── app.ts                   # Express app setup
│   │   ├── server.ts                # Server startup
│   │   └── config/                  # Config HTTP
│   │       ├── cors.config.ts
│   │       ├── helmet.config.ts
│   │       ├── rate-limit-config.ts
│   │       └── env/env.ts
│   └── factories/                   # Factories de controllers/middlewares
│       ├── make-sign-in-controller.ts
│       ├── make-sign-up-controller.ts
│       └── make-authentication-middleware.ts
│
└── shared/                          # 🟣 COMPARTILHADO
    └── types/                       # Tipos compartilhados
        └── express.d.ts             # Extensões de tipos Express
```

### 🎯 Princípios Aplicados

#### Clean Architecture

1. **Domain (Núcleo)** 🟢
   - ✅ Não depende de NADA
   - ✅ Contém apenas lógica de negócio pura
   - ✅ Interfaces de repositórios e serviços
   - ✅ Entidades e Value Objects
   - ✅ Erros de domínio

2. **Application** 🟡
   - ✅ Depende apenas de Domain
   - ✅ Orquestra casos de uso
   - ✅ Não conhece HTTP, banco de dados, etc.
   - ✅ DTOs para transferência de dados

3. **Infrastructure** 🔴
   - ✅ Implementa interfaces do Domain
   - ✅ Prisma, JWT, Bcrypt, etc.
   - ✅ Pode ser trocado sem afetar outras camadas
   - ✅ Factories para criação de dependências

4. **Presentation** 🔵
   - ✅ Depende de Application e Domain
   - ✅ HTTP, CLI, GraphQL, etc.
   - ✅ Adapta entrada/saída para casos de uso
   - ✅ Controllers, Routes, Middlewares

#### SOLID Principles

- **S**ingle Responsibility: Cada classe tem uma responsabilidade única
- **O**pen/Closed: Extensível via interfaces, fechado para modificação
- **L**iskov Substitution: Implementações substituem interfaces corretamente
- **I**nterface Segregation: Interfaces específicas e pequenas
- **D**ependency Inversion: Dependências apontam para abstrações (interfaces)

### 🔄 Fluxo de Dados

```
HTTP Request
    ↓
Presentation Layer (Controllers)
    ↓
Application Layer (Use Cases)
    ↓
Domain Layer (Business Logic)
    ↓
Infrastructure Layer (Implementations)
    ↓
Database/External Services
```

### 📝 Exemplo de Fluxo

1. **Request HTTP** → `Presentation/HTTP/Controllers`
2. **Controller** valida entrada com `Validators` (Zod)
3. **Controller** chama `Use Case` da Application Layer
4. **Use Case** orquestra lógica usando interfaces do Domain
5. **Infrastructure** implementa as interfaces (Prisma, JWT, etc.)
6. **Response** retorna através das camadas

## 🐳 Docker

### Desenvolvimento

Para desenvolvimento, use apenas o PostgreSQL:

```bash
pnpm docker:dev
```

Isso inicia apenas o PostgreSQL na porta **5433**, permitindo que você rode a aplicação localmente.

### Produção

Para rodar tudo com Docker:

```bash
# Construir e iniciar
pnpm docker:build
pnpm docker:up

# Parar
pnpm docker:down
```

## 🔒 Segurança

- ✅ Validação de variáveis de ambiente com Zod
- ✅ JWT com secret mínimo de 32 caracteres
- ✅ Hash de senhas configurável (bcrypt)
- ✅ CORS configurável
- ✅ Helmet para headers de segurança
- ✅ Rate limiting para prevenir ataques
- ✅ Type safety com TypeScript

## 📚 Endpoints

### Health Check

- `GET /health` - Verifica saúde da aplicação e conexão com banco

### Autenticação

- `POST /auth/sign-up` - Criar nova conta
- `POST /auth/sign-in` - Fazer login e obter token JWT

### Contas (Protegido)

- `GET /accounts` - Listar contas (requer autenticação)

## 📝 Próximos Passos

1. ✅ Implementar casos de uso (register, authenticate)
2. ✅ Criar controllers e rotas
3. ✅ Implementar middlewares de autenticação
4. ⏳ Adicionar testes
5. ⏳ Configurar CI/CD

## 📚 Documentação

- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Docker Docs](https://docs.docker.com/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

ISC
