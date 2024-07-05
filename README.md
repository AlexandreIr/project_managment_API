# Project Managment API
Esta é uma API CRUD completa para um sistema de gestão de projetos com autenticação JWT.
## Endpoints
### POST /user
Esse endpoint é responsável por verificar a existência de usuários e por criar usuários no banco de dados.
### POST /auth
Esse é o endpoint responsável pela autenticação do usuário, verificar usuário e senha usando o bcrypt e retornar um token jwt.
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
Essa resposta acontece quando o usuário não está logado ou aconteceu alguma falha durante o processo de autenticação.

