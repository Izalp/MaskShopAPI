[![CIDC - MaskShopAPI](https://github.com/Izalp/MaskShopAPI/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Izalp/MaskShopAPI/actions/workflows/pipeline.yml)

# MaskShopAPI 🎭

MaskShop é uma API desenvolvida em Node.js para gerenciar clientes, produtos e pedidos de uma loja de máscaras.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **JWT (JSON Web Token)**
- **Nodemailer**
- **SendGrid**
- **Jest (Testes Unitários)**

## Como Executar o Projeto

### 1. Clonar o Repositório
```sh
git clone https://github.com/Izalp/maskshop.git
```

### 2. Instalar as Dependências
```sh
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione:
```env
SALT_KEY=seu_salt_aqui
EMAIL_TMPL=Olá, {0}, bem-vindo ao MaskShop!
SENDGRID_API_KEY=sua_chave_aqui
MONGODB_CONNECTION=mongodb://localhost:27017/maskshop
```

### 4. Rodar o Servidor
```sh
npm start
```

Modo desenvolvimento com Nodemon:
```sh
npm run dev
```

### 5. Executar Testes
```sh
npm test
```

## Endpoints da API

### Autenticação
- **POST** `/customers` → Cadastra um novo cliente.  
- **POST** `/customers/authenticate` → Autentica um cliente e gera um token JWT.  
- **POST** `/customers/refresh-token` → Renova o token JWT do cliente.  

### Produtos
- **GET** `/products` → Lista todos os produtos disponíveis.  
- **GET** `/products/:id` → Busca um produto específico pelo ID.  
- **GET** `/products/slug/:slug` → Busca um produto pelo seu slug.  
- **POST** `/products` → Cria um novo produto.  
- **PUT** `/products/:id` → Atualiza um produto existente.  
- **DELETE** `/products` → Remove um produto.  

### Pedidos
- **GET** `/orders` → Lista todos os pedidos realizados.  
- **POST** `/orders` → Cria um novo pedido.  

## Pipeline CI/CD
Este projeto utiliza **GitHub Actions** para:
- Rodar build e testes automáticos.
- Enviar notificações por e-mail após a execução do pipeline.

## Autor
Desenvolvido por [**Iza Lopes**](https://github.com/Izalp)

