# Teste para desenvolvevedores mobile Catho
Este é o teste técnico para processo seletivo de desenvolvimento de apps mobile da Catho.

## Desafio
Desenvolver uma tela de aplicativo seguindo o layout proposto como referência e uma api mockada para carregar os dados.

### Layout
O seu aplicativo deve seguir o layout abaixo como referência.

TODO: Layout

#### Assets
Os assets estão disponíveis na pasta /api/assets/.
Você pode utilizar ele dentro do applicativo ou carrega-las utilizando o host da api http://localhost:4040/assets

---

### Premissas
**Importante:** escolha um conforme a vaga que está participando no processo.

- Para desenvolvedores Android: utilizar Kotlin
- Para desenvolvedores IOS: utilizar Swift

## O que será avaliado
- Organização e clareza de código
- Componentização
- Manutenabilidade
- Controle de qualidade
- Controle de versão
- Controle de release
- Performance
- Fidelidade ao layout
- Experiência de usuário

## Melhorias
Realize o teste com os recursos disponíveis, porém anote e nos envie qualquer melhoria que gostaria de realizar e o porque deveriamos implementar tal melhoria.

---

### API
Abaixo segue os recursos e como executar a api que retornará os dados para a construção da tela.

#### Roteiro
1. Carregue as chaves de autenticação das apis (/keys);
2. Como não teremos uma tela de login, escolha um dos ids disponíveis no metodo /auth
3. Agora você tem todos os dados que necessita para realizar os demais recursos. A ordem dos requests fica a seu critério.

#### Pré requisitos
- [Docker](https://www.docker.com/) ou [NodeJs](https://nodejs.org/en/)

#### Executando a api
Para rodar a api, execute uma das opções abaixo:
- Usando docker:
```sh
./scripts/mock-server-docker.sh
```
- Usando NodeJs:
```sh
./scripts/mock-server-local.sh
```

#### Recursos
##### Keys
```sh
curl --location --request GET 'localhost:4040/keys'
```
Response:
```json
{
  "auth": "$authkey",
  "tips": "$tipskey",
  "suggestion": "$suggestionkey",
  "survey": "$surveykey"
}
```
| propriedade | tipo | descrição |
| ----------- | ---- | --------- |
| api name | sha512 | chave de autorização para a api |

**Importante:** Enviar a chave correspondente em todos os demais requests. Não enviar a chave ou enviar a chave errada causará um retorno com status 401.

##### Auth
```sh
curl --location --request GET 'http://localhost:4040/auth/:userId/'
```

| ids disponíveis |
| --------------- |
| ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc |
| cc3431c3-d9c9-48e2-8a1f-c3c0260f0712 |

Response:
```json
{
  "id": "ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc",
  "name": "Leticia da Silva",
  "token": "IltvYmplY3QgT2JqZWN0XSAi.eyJzdWIiOiJlZTA5YmQzOS00Y2EyLTQ3YWMtOWM1ZS05YzU3YmE1YTI2ZGMiLCJuYW1lIjoiTGV0aWNpYSBkYSBTaWx2YSIsImlhdCI6MTUxNjIzOTAyMn0.Dk_R9gr5RHJtl3FYjQFa7dgQySrL78d887Jk9WVdfIA",
  "photo": "/assets/ee09bd39-4ca2-47ac-9c5e-9c57ba5a26dc.jpg"
}
```
| propriedade | tipo | descrição |
| ----------- | ---- | --------- |
| id | uuid | id unico de referência ao usuario |
| name | string | nome do usuario |
| token | string | token jwt de sessao do usuario |
| photo | string | path da foto do usuario |

##### Suggestion
```sh
curl --location --request GET 'http://localhost:4040/suggestion' \
--header 'Authorization: $userToken' \
--header 'x-api-key: $apiKey'
```

Headers:
| header | tipo | descrição |
| ----------- | ---- | --------- |
| Authorization | string | token de acesso do usuario recuperado pelo /auth |
| x-api-key | string | chave de authenticação da api retornada pelo /keys |

Response:
```json
[
  {
    "jobAdTile": "Desenvolvedor Mobile - Android",
    "company": "CATHO",
    "date": "Hoje",
    "totalPositions": 1,
    "locations": [
      "Barueri (SP)"
    ],
    "salary": {
      "real": "",
      "range": "A Combinar"
    }
  }
]
```

Headers:
| header | tipo | descrição |
| ----------- | ---- | --------- |
| jobAdTitle | string | titulo da vaga |
| company | string | nome da empresa |
| date | string | data formatada |
| totalPositions | number | numero de vagas no anuncio |
| locations | array | lista de localidades que as vagas atendem |
| salary | object |  |
| salary.real | string | salario real. Quando preenchido exibir o real |
| salary.range | string | faixa salarial da vaga. Somente exibido quando não existe salarial real preenchido |

##### Tips
```sh
curl --location --request GET 'http://localhost:4040/tips' \
--header 'x-api-key: $apiKey'
```
Headers:
| header | tipo | descrição |
| ----------- | ---- | --------- |
| x-api-key | string | chave de authenticação da api retornada pelo /keys |

Response:
```json
[
  {
    "id": "ea9ff33d-16db-42e8-9913-3fb52f3cb992",
    "description": "Antes de enviar o seu currículo, que tal checar a última vez que você o atualizou? Uma informação a mais pode ser o ponta-pé que falta rumo à sua próxima entrevista de emprego.",
    "button": {
      "show": true,
      "label": "checar curriculo",
      "url": "https://www.catho.com.br"
    }
  }
]
```

| propriedade | tipo | descrição |
| ----------- | ---- | --------- |
| id | uuid | id unico da dica |
| description | string | conteudo da dica |
| button | object | |
| button.show | boolean | informa se o botão deve ser exibido ou não |
| button.label | string | label do botão |
| button.url | string | url que deve ser carregada ao clicar no botão |

##### Survey
```sh
curl --location --request POST 'http://localhost:4040/survey/tips/$tipId/$action' \
--header 'Authorization: $userToken' \
--header 'x-api-key: $apiKey'
```

Headers:
| header | tipo | descrição |
| ----------- | ---- | --------- |
| Authorization | string | token de acesso do usuario recuperado pelo /auth |
| x-api-key | string | chave de authenticação da api retornada pelo /keys |

| actions disponiveis |
| ----------- |
| like |
| dislike |

Response:
```json
{
  "id": "70fe9fd8-1ff8-4eec-8735-ed6ccb85c782",
  "created-at": "2020-07-03T16:34:48.4848-03:00",
  "tipId": "ea9ff33d-16db-42e8-9913-3fb52f3cb992",
  "action": "like",
  "message": "Answer was registered"
}
```

| propriedade | tipo | descrição |
| ----------- | ---- | --------- |
| id | uuid | id unico da resposta enviada |
| created-at | string | timestamp do envio da resposta |
| tipId | uuid | id unico da dica para qual foi respondido |
| action | string | resposta enviada |
| message | string | descrição do status da request |
