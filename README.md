# Random App

App reaproveitado de um processo seletivo e feito com o intuito de aprofundar meus conhecimentos em frameworks e ferramentas como **NestJS**, **Pactum**, **Swagger**, **Vitest** e **Tailwind**

## 💻 Tecnologias Utilizadas

#### Banco de dados:

- [MongoDB](https://www.mongodb.com/)

#### Backend:

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Swagger](https://swagger.io/)
- [Pactum](https://pactumjs.github.io/)

#### Frontend:

- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Yup](https://github.com/jquense/yup)
- [React-Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [React-Testing-Library](https://testing-library.com/)

#### Gerenciador de Containers:

- [Docker/docker-compose](https://www.docker.com/)

## 📋 Dependências para rodar o app

- Docker-compose -> Versão 1.29 ou superior [Veja a documentação para instruções de como instalar/atualizar](https://docs.docker.com/compose/install/)

## 🔧 Como rodar o app

```bash
    # Clone o repositório
    $ git clone git@github.com:RafaelCunhaS/Random-App

    # Vá até a pasta criada
    $ cd Random-App

    # Suba os containers com o docker-compose, o app estará rodando em plano de fundo em seu
    # localhost na porta 3000 (http://localhost:3000/) quando a construção acabar
    $ docker-compose up -d --build

    # Quando terminar de utilizar o app, desfaça os containers criados(a flag '-v' remove os volumes
    # criados e a flag '--rmi all' remove todas imagens criadas)
    $ docker-compose down -v --rmi all
```

### Quando a construção dos containers terminar, o app estará rodando em [localhost:3000](http://localhost:3000/)

### Documentação da API do backend estará em [localhost:3001/api](http://localhost:3001/api/)

### O banco de dados estará rodando na porta _27017_

## Para logar na aplicação utilize as seguintes credenciais:

- username: johndoe
- senha: 123456
