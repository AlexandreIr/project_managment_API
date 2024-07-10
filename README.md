# Project Managment API
Esta é uma API CRUD completa para um sistema de gestão de projetos com autenticação JWT.
## Endpoints
### POST /user
Esse endpoint é responsável por verificar a existência de usuários e por criar usuários no banco de dados.
### Parâmetros
name: nome do usuário que sera cadstrado.
email: e-mail de um usuário cadastrado.
password: senha do usuário que possui o e-email.
### Respostas
#### Ok(200)
O usuário foi criado com sucesso no banco de dados.
### POST /auth
Esse é o endpoint responsável pela autenticação do usuário, verificar usuário e senha usando o bcrypt e retornar um token jwt. 
#### Parâmetros
email: e-mail de um usuário cadastrado.
password: senha do usuário que possui o e-email
#### Respostas
##### Ok(200)
Essa resposta ocorre quando tudo vai bem na autenticação e retorna um token. Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGV4QGdtYWlsLmNvbSIsIm5hbWUiOiJBbGV4YW5kcmUiLCJpYXQiOjE3MjA1NzU1MzYsImV4cCI6MTcyMDY2MTkzNn0.ZEpjcwYpVyOpRgc3U4nc-sjz7OxsE7Wxdky1FhHyEyk"
}
```
##### Bad Request(400)
Essa resposta ocorre quando 
```
{
    "err": "Senha incorreta"
}
```
### GET /projects
Endpoint responsável por retornar ao usuário os projetos criados por ele
#### Parâmetros
Nenhum.
#### Respostas
##### Ok(200)
Essa resposta retorna todos os projetos do usuário logado e informações sobre o usuário logado. Exemplo de resposta:

```
{
    "user": {
        "id": 1,
        "email": "alex@gmail.com",
        "name": "Alexandre"
    },
    "projects": [
        {
            "id": 9,
            "title": "Projeto web",
            "description": "Projeto web feito em express",
            "createdAt": "2024-07-04T03:55:57.000Z",
            "updatedAt": "2024-07-04T03:55:57.000Z",
            "userId": 1
        },
        {
            "id": 10,
            "title": "Projeto mobile",
            "description": "Projeto mobile feito por AlexandreIr",
            "createdAt": "2024-07-04T04:00:43.000Z",
            "updatedAt": "2024-07-04T04:00:43.000Z",
            "userId": 1
        }
    ]
}
```
##### Não autorizado(401)
Essa resposta acontece quando o usuário não está logado ou aconteceu alguma falha durante o processo de autenticação. Exemplo de resposta: 
´´´
{
    "name": "TokenExpiredError",
    "message": "jwt expired",
    "expiredAt": "2024-07-06T04:44:10.000Z"
}
´´´
### GET /projects/:id
Retorna as informações de um projeto baseado no id informado na URL.
#### Parâmetros
id: A chave primária de um projeto especifico do qual se deseja obter mais informações passada na url
#### Respostas
##### Ok(200)
Retorna as informações sobre o projeto requisitado. Exemplo: 
```
{
    "id": 9,
    "title": "Projeto web",
    "description": "Projeto web feito em express",
    "createdAt": "2024-07-04T03:55:57.000Z",
    "updatedAt": "2024-07-04T03:55:57.000Z",
    "userId": 1
}
```
#### Não encontrado (404)
Retorna um json informando que o projeto não foi encontado. Exemplo:
```
{
    "notFound": "projeto 50 não encontrado"
}
```
### POST /project
Endpoint responsável pela criação de um projeto no sistema.
#### Parâmetros
title: titulo do projeto
description: descrição do projeto
#### Respostas
##### Criado(201)
Retorna status de criado e as informações do usuário logado, que é creditado como criado do projeto. Exemplo de resposta:
´´´
{
    "id": 1,
    "email": "alex@gmail.com",
    "name": "Alexandre"
}
´´´
#### Não autorizado(401)
Retorna o status 401 que indica não autorizado, normalmente devido ao usuário não ter realizado login. Exemplo de resposta:
```
{
    "err": "Token inválido"
}
```
### DELETE /project/:id
Endpoint responsável por deletar um projeto de um usuário a partir do id.
#### Parâmetros
id: chave primária passada na url.
#### Respostas
##### Sem conteúdo(204)
O projeto foi apagado, não há nada a retornar
#### Não autorizado(401)
O usuário não tem autorização para excluir esse projeto pois não foi criado por ele. A seguinte resposta é retornada: 
```
{
    "err": "Usuário não autorizado"
}
```
#### Projeto não encontrado(404)
O projeto não foi encontrado dentro do banco de dados. A seguinte resposta será retornarda:
```
{
    "notFound": "projeto 180 não encontrado"
}
```

### PUT /project/:id
Endpoint para edição de um projeto baseado no id do mesmo.
#### Parâmetros
id: chave primária passada na url.
#### Respostas
##### Redirecionamento(308)
Se tudo ocorreu corretamente, redireciona o usuário para a página do projeto alterado (GET /project/:id).
#### Não autorizado(401)
O usuário não tem autorização para editar esse projeto pois não foi criado por ele. A seguinte resposta é retornada: 
```
{
    "err": "Usuário não autorizado"
}
```

### Projeto não encontrado(404)
O projeto não foi encontrado dentro do banco de dados. A seguinte resposta será retornarda:
```
{
    "notFound": "projeto 180 não encontrado"
}
```