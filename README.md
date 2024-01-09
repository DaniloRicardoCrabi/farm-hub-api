<h1 align="center">Farm Hub API - 🚜💲🚀</h1>

## Descrição do Projeto

<p align="center"> 🎉 A API oferece uma solução para gerenciar dados relacionados a fazendeiros e fazendas. E possui recursos para a obtenção de indicadores da base. </p>

### Indice

- [Features](#features)
- [Install and Run](#install-and-run)
- [Swagger](#swagger)
- [Endpoints](#endpoints)
- [Tecnologies](#tecnologies)
- [Author](#author)

### 📢 Features

- CRUD de fazendeiros.
- CRUD de fazendas.
- Listagem de indicadores.
  - Total de fazendeiros.
  - Total de fazendeiros por estado.
  - Total de fazendas.
  - Total de fazendas por estado.
  - Total de fazendas por tipo de cultura.
  - Total de Hectares.
  - Total de Hectares por vegetação e área cultivável.

### 🎲 Install and Run

```sh
git clone https://github.com/DaniloRicardoCrabi/farm-hub-api.git
cd farm-hub-api
# Crie um arquivo .env na raiz do projeto com base no arquivo .env.example
npm install
# Caso necessário, execute o comando abaixo para criar o banco de dados
docker-compose up -d
# Execute as migrations
npm run migration:run
# Execute os seeds caso deseje popular o banco de dados
npm run seed
# Execute o projeto
npm run dev

🚀🚀🚀
```

#### 📢  Swagger

Após a execução do projeto, acesse:

- [Swagger](http://localhost:3333/docs)

### ✨  Endpoints

- Producers
  - [GET] /producers
  - [GET] /producers/:id
  - [POST] /producers
  - [PUT] /producers/:id
  - [DELETE] /producers/:id
- Farms
  - [GET] /farms
  - [GET] /farms/:id
  - [POST] /farms
  - [PUT] /farms/:id
  - [DELETE] /farms/:id  
- Reports
  - [GET] /reports/total-producers
  - [GET] /reports/total-producers-by-state
  - [GET] /reports/total-farms
  - [GET] /reports/total-farms-by-state
  - [GET] /reports/total-by-cultivated-crops
  - [GET] /reports/total-hectares
  - [GET] /reports/total-by-vegetated-and-cultivable-hectares

### 🛠 Tecnologies

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [AdonisJS](https://adonisjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Swagger](https://swagger.io/)
- [Lucid ORM](https://preview.adonisjs.com/guides/database/introduction/)

### 🙅🏼‍♂️ Author

---

<a href="https://github.com/DaniloRicardoCrabiFreitas">
 <img style="border-radius: 50%;" src=https://avatars.githubusercontent.com/u/22197655?v=4 width="100px;" alt=""/>
 <br/>
 <b>Danilo Ricardo Crabi Freitas</b></a>

Feito com ❤️ por Danilo Freitas.

[![Linkedin Badge](https://img.shields.io/badge/-Danilo-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/danilo-crabi/)](https://www.linkedin.com/in/danilo-crabi/)
