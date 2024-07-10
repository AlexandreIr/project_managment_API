# Project Managment API
Esta é uma API CRUD completa para um sistema de gestão de projetos com autenticação JWT.
## Endpoints
### POST /user
Esse endpoint é responsável por verificar a existência de usuários e por criar usuários no banco de dados.
### Parâmetros
Nenhum.
### Respostas
#### Ok(200)
O usuário foi criado com sucesso no banco de dados.
### POST /auth
Esse é o endpoint responsável pela autenticação do usuário, verificar usuário e senha usando o bcrypt e retornar um token jwt. 
#### Parâmetros
Nenhum.
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
id: A chave primária de um projeto especifico do qual se deseja obter mais informações 
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


