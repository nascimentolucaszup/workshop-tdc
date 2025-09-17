Implemente um endpoint em Next.js que permita acionar os endpoints da StackSpot AI para executar Quick Commands, utilizando um callback para recuperar os resultados. Siga as melhores práticas recomendadas pelo framework.

Além disso, crie:

- Os endpoints necessários para a comunicação com a StackSpot AI.
- Um hook customizado (React Hook) para abstrair a chamada desses endpoints, seguindo o padrão do projeto.

O objetivo é garantir uma integração eficiente, reutilizável e alinhada com as convenções do Next.js e da StackSpot.

Use o `services/stackspot-auth.ts` para recuperar os tokens da StackSpot AI e os tipos de dados da `types/stackspot.ts`.

**Endpoint para Criar Execução de um Quick Command**

Este endpoint permite criar uma execução de um Quick Command. É possível fornecer dados de entrada opcionais no campo `input_data`, que pode ser uma string ou um objeto JSON. Para manter o contexto entre diferentes execuções, também é possível enviar um `conversation_id` como parâmetro de URL. O `conversation_id` deve seguir o formato ULID. Recomenda-se realizar a primeira solicitação sem esse campo, obtê-lo na resposta do callback e utilizá-lo nas execuções subsequentes.

---

### Parâmetros

| Nome             | Obrigatório | Tipo    | Local   | Restrições                                                                 |
|------------------|-------------|---------|---------|----------------------------------------------------------------------------|
| slug             | Sim         | string  | path    | minLength: 1, maxLength: 85, pattern: ^([A-Za-z0-9-_]*)$                   |
| conversation_id  | Não         | string  | query   | Deve ser um ULID                                                           |
| authorization    | Sim         | string  | header  | Token de autenticação (Bearer)                                              |

---

### Corpo da Requisição (`application/json`)

Exemplo com texto:
{
  "input_data": "string"
}

Exemplo com objeto JSON:
{
  "input_data": {
    "json": "object"
  }
}

---

### Respostas

| Código | Descrição                | Exemplo de Resposta                                      | Tipo de Conteúdo      |
|--------|--------------------------|----------------------------------------------------------|-----------------------|
| 200    | Resposta Bem-sucedida    | `"string"`                                               | application/json      |
| 404    | Não Encontrado           | `"string"`                                               | application/json      |
| 422    | Erro de Validação        | `{ "detail": [ { "loc": ["string", 0], "msg": "string", "type": "string" } ] }` | application/json      |

---

**Resumo:**  
Utilize este endpoint para criar execuções de Quick Commands, fornecendo dados de entrada conforme necessário e, opcionalmente, um `conversation_id` para manter o contexto entre execuções. Certifique-se de seguir as restrições dos parâmetros e analisar as respostas para tratar possíveis erros. 

**Endpoint de Callback**

O endpoint de callback é utilizado para monitorar o status de execução de um processo. Para isso, é necessário informar o parâmetro de caminho `execution_id`, obtido previamente no endpoint de criação de execução. O monitoramento deve ser feito até que o campo `process.status` retorne o valor `COMPLETED`, indicando que a execução foi finalizada. Nesse momento, o resultado estará disponível no campo `final_result`.

---

### Parâmetros

| Nome           | Obrigatório | Tipo    | Local   | Descrição                                  |
|----------------|-------------|---------|---------|---------------------------------------------|
| execution_id   | Sim         | string  | path    | Identificador da execução                   |
| authorization  | Sim         | string  | header  | Token de autorização                       |

---

### Respostas

#### 200 – Sucesso

{
  "execution_id": "string",
  "quick_command_slug": "string",
  "conversation_id": "string",
  "progress": {
    "start": "2024-02-15T20:48:43.990Z",
    "end": "2024-02-15T20:48:43.990Z",
    "duration": 0,
    "execution_percentage": 0,
    "status": "string"
  },
  "steps": [
    {
      "step_name": "string",
      "execution_order": 0,
      "type": "LLM",
      "step_result": {
        "status_code": 0,
        "headers": {
          "additionalProp1": "string",
          "additionalProp2": "string",
          "additionalProp3": "string"
        },
        "data": "string",
        "json_data": {}
      }
    }
  ],
  "result": "string"
}
- O campo `progress` indica o andamento da execução do Quick Command.

#### 404 – Não Encontrado

"string"

#### 422 – Erro de Validação

{
  "detail": [
    {
      "loc": ["string", 0],
      "msg": "string",
      "type": "string"
    }
  ]
}

---

**Observação:**  
O conteúdo do parâmetro deve ser enviado como `application/json`. O campo `progress` sempre indica o progresso da execução do Quick Command. 