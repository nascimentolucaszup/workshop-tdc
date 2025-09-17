Implemente um endpoint em Next.js que permita acionar os endpoints da StackSpot AI para executar Quick Commands, utilizando um callback para recuperar os resultados. Siga as melhores práticas recomendadas pelo framework.

Além disso, crie:

- Os endpoints necessários para a comunicação com a StackSpot AI.
- Um hook customizado (React Hook) para abstrair a chamada desses endpoints, seguindo o padrão do projeto.
  - adicione essas regras no hook
    - Cleanup polling on unmount
    - (useEffect not shown here for brevity, but should clearInterval on unmount)
  - adicione um delay para efetuar a verificação o resultado da execução do quick command.

O objetivo é garantir uma integração eficiente, reutilizável e alinhada com as convenções do Next.js e da StackSpot.

Refatore o componente `components/NotificationFlow/steps/SuggestionsStep.tsx` para utilizar o hook criado, aproveitando os dados retornados pelo quick command da StackSpot AI.

Para isso:

- Utilize o arquivo `services/stackspot-auth.ts` para recuperar os tokens da StackSpot AI.
- Importe os tipos de dados necessários de `types/stackspot.ts`.
- Os dados necessários estarão disponíveis no campo `result.subagents.content_agent` do retorno do endpoint, em formato JSON, conforme o schema especificado.

GERE O COMPONENTE `components\NotificationFlow\steps\SuggestionsStep.tsx` REFATORADO POR COMPLETO.

```json
{
  "context": {
    "user_request": "Planejar uma campanha de notifica\u00e7\u00f5es para o lan\u00e7amento do iPhone 17, destacando seus diferenciais, novidades tecnol\u00f3gicas e benef\u00edcios para o p\u00fablico jovem adulto (18-30 anos). O tom deve ser inovador, empolgante e com foco em tecnologia de ponta. Inclua sugest\u00f5es de canais e formatos de notifica\u00e7\u00e3o.",
    "trend_topics": [
      "iPhone 17",
      "Apple Event",
      "Novidades em smartphones",
      "Tecnologia de ponta",
      "Lan\u00e7amentos Apple 2024"
    ],
    "additional_context": "O p\u00fablico-alvo s\u00e3o jovens adultos conectados, early adopters de tecnologia, que valorizam inova\u00e7\u00e3o, design e exclusividade. A campanha deve gerar expectativa e desejo de compra, utilizando linguagem moderna e emojis quando apropriado."
  },
  "planning": {
    "strategy": "Criar uma campanha de notifica\u00e7\u00f5es progressiva e envolvente que construa antecipa\u00e7\u00e3o para o lan\u00e7amento do iPhone 17, utilizando gatilhos mentais de escassez, novidade e pertencimento. A estrat\u00e9gia foca em mensagens curtas e impactantes que destacam os diferenciais tecnol\u00f3gicos do produto, com linguagem jovem e uso estrat\u00e9gico de emojis para aumentar o engajamento.",
    "steps": [
      "Fase 1 - Teaser (7 dias antes): Criar mist\u00e9rio e curiosidade sobre o lan\u00e7amento com mensagens enigm\u00e1ticas",
      "Fase 2 - Revela\u00e7\u00e3o (3 dias antes): Apresentar os principais diferenciais tecnol\u00f3gicos com foco em inova\u00e7\u00e3o",
      "Fase 3 - Lan\u00e7amento (Dia D): Notifica\u00e7\u00f5es urgentes sobre disponibilidade e benef\u00edcios exclusivos",
      "Fase 4 - P\u00f3s-lan\u00e7amento (3 dias ap\u00f3s): Refor\u00e7ar FOMO e criar senso de urg\u00eancia para compra"
    ]
  },
  "subagents": {
    "search_agent": {
      "objective": "Buscar informa\u00e7\u00f5es sobre tend\u00eancias de marketing mobile, melhores pr\u00e1ticas de push notifications para lan\u00e7amentos de produtos tech e diferenciais esperados para o iPhone 17",
      "sources": [
        "Tend\u00eancias de marketing mobile 2024",
        "Cases de sucesso em lan\u00e7amentos Apple",
        "Expectativas e rumores sobre iPhone 17",
        "Melhores pr\u00e1ticas de push notifications"
      ],
      "results": [
        {
          "title": "Diferenciais tecnol\u00f3gicos esperados para iPhone 17",
          "summary": "Chip A19 Pro com IA avan\u00e7ada, c\u00e2mera perisc\u00f3pica de 200MP, tela ProMotion 240Hz, bateria de grafeno com carregamento ultra-r\u00e1pido",
          "url": "https://tech-trends.com/iphone17-features"
        },
        {
          "title": "Estrat\u00e9gias de notifica\u00e7\u00e3o para Gen Z e Millennials",
          "summary": "Uso de emojis aumenta CTR em 45%, mensagens personalizadas t\u00eam 3x mais convers\u00e3o, hor\u00e1rios ideais entre 12h-14h e 18h-21h",
          "url": "https://mobile-marketing.com/push-best-practices"
        },
        {
          "title": "Gatilhos mentais eficazes para produtos tech",
          "summary": "Escassez, exclusividade, prova social e novidade s\u00e3o os gatilhos mais eficazes para early adopters de tecnologia",
          "url": "https://psychology-marketing.com/tech-triggers"
        }
      ]
    },
    "content_agent": {
      "objective": "Criar notifica\u00e7\u00f5es push altamente engajadoras para cada fase da campanha do iPhone 17, aplicando storytelling, gatilhos mentais e linguagem adequada ao p\u00fablico jovem adulto tech-savvy",
      "notifications": [
        {
          "title": "\ud83e\udd2b Algo revolucion\u00e1rio est\u00e1 chegando...",
          "body": "O futuro dos smartphones nunca mais ser\u00e1 o mesmo. Prepare-se para o imposs\u00edvel \ud83d\ude80",
          "channels": ["smartphone", "browser"]
        },
        {
          "title": "\u26a1 iPhone 17: O futuro chegou",
          "body": "Chip A19 Pro com IA que pensa como voc\u00ea + C\u00e2mera 200MP que captura o invis\u00edvel \ud83d\udcf8\u2728",
          "channels": ["smartphone", "browser"]
        },
        {
          "title": "\ud83d\udd25 DISPON\u00cdVEL AGORA!",
          "body": "iPhone 17 liberado! Seja um dos primeiros a ter o smartphone mais poderoso do planeta \ud83c\udf0d\ud83d\udcaa",
          "channels": ["smartphone"]
        },
        {
          "title": "\ud83c\udfaf Exclusivo: 10% OFF nas primeiras 24h",
          "body": "Apenas para early adopters como voc\u00ea! Use o c\u00f3digo FUTURE17 e garanta o seu \ud83c\udfc3\u200d\u2642\ufe0f\ud83d\udca8",
          "channels": ["smartphone", "browser"]
        },
        {
          "title": "\ud83d\udc40 Veja o que voc\u00ea est\u00e1 perdendo",
          "body": "ProMotion 240Hz + Bateria de grafeno que dura 3 dias. O iPhone 17 est\u00e1 redefinindo limites \ud83d\udd0b\u267e\ufe0f",
          "channels": ["smartphone"]
        },
        {
          "title": "\u23f0 \u00daltimas unidades do lote inicial!",
          "body": "87% vendido! N\u00e3o fique de fora da revolu\u00e7\u00e3o. Garanta seu iPhone 17 agora \ud83d\udcf1\ud83d\udc8e",
          "channels": ["smartphone", "browser"]
        },
        {
          "title": "\ud83e\udd16 IA que aprende com voc\u00ea",
          "body": "O iPhone 17 se adapta ao seu estilo. Descubra um smartphone que evolui junto com voc\u00ea \ud83e\udde0\u2728",
          "channels": ["smartphone"]
        },
        {
          "title": "\ud83d\udcf8 Modo noturno imposs\u00edvel",
          "body": "C\u00e2mera perisc\u00f3pica 200MP captura detalhes no escuro total. Veja demos incr\u00edveis \u2192",
          "channels": ["smartphone", "browser"]
        },
        {
          "title": "\ud83d\udcb3 Parcele em at\u00e9 24x sem juros",
          "body": "iPhone 17 a partir de R$ 291/m\u00eas. Tecnologia de ponta ao seu alcance \ud83d\udcb0\u2705",
          "channels": ["smartphone"]
        },
        {
          "title": "\ud83c\udfc6 #1 em satisfa\u00e7\u00e3o mundial",
          "body": "9.8/10 pelos primeiros usu\u00e1rios. Junte-se aos que j\u00e1 vivem o futuro \ud83c\udf1f",
          "channels": ["smartphone", "browser"]
        }
      ]
    }
  },
  "self_attention": {
    "analysis": "A solicita\u00e7\u00e3o requer uma campanha de notifica\u00e7\u00f5es para o lan\u00e7amento do iPhone 17, focada em jovens adultos (18-30 anos) que s\u00e3o early adopters de tecnologia. O tom deve ser inovador e empolgante, com uso apropriado de emojis. Analisei as tend\u00eancias atuais, o perfil do p\u00fablico-alvo e as melhores pr\u00e1ticas de push notifications para criar uma campanha que gere desejo e urg\u00eancia de compra.",
    "validation": "Todas as informa\u00e7\u00f5es relevantes foram compreendidas e utilizadas: p\u00fablico-alvo definido (18-30 anos, early adopters), tom de voz (inovador, empolgante, moderno), foco em tecnologia de ponta, uso estrat\u00e9gico de emojis, m\u00faltiplos canais (smartphone e browser), e aplica\u00e7\u00e3o de gatilhos mentais apropriados (escassez, novidade, exclusividade, prova social). A campanha foi estruturada em 4 fases para maximizar o engajamento e convers\u00e3o."
  }
}
```

Os dados das recomendações de notificações estão disponíveis em `subagents.content_agent.notification`.

O componente `components/NotificationFlow/steps/SuggestionsStep.tsx` deve recuperar as informações das etapas anteriores, localizadas em `components/NotificationFlow/steps/TrendSelectionStep.tsx` e `components/NotificationFlow/steps/AdditionalContextStep.tsx`. Com esses dados, é necessário montar um `prompt` contendo as informações de `<trends_topics></trends_topics>` e `<additional_context></additional_context>`, que será enviado para o quick command.

Mostre o progresso da execução do quick command.

**Endpoint para Criar Execução de um Quick Command**

Este endpoint permite criar uma execução de um Quick Command. É possível fornecer dados de entrada opcionais no campo `input_data`, que pode ser uma string ou um objeto JSON. Para manter o contexto entre diferentes execuções, também é possível enviar um `conversation_id` como parâmetro de URL. O `conversation_id` deve seguir o formato ULID. Recomenda-se realizar a primeira solicitação sem esse campo, obtê-lo na resposta do callback e utilizá-lo nas execuções subsequentes.

---

### Parâmetros

| Nome            | Obrigatório | Tipo   | Local  | Restrições                                                |
| --------------- | ----------- | ------ | ------ | --------------------------------------------------------- |
| slug            | Sim         | string | path   | minLength: 1, maxLength: 85, pattern: ^([A-Za-z0-9-_]\*)$ |
| conversation_id | Não         | string | query  | Deve ser um ULID                                          |
| authorization   | Sim         | string | header | Token de autenticação (Bearer)                            |

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

| Código | Descrição             | Exemplo de Resposta                                                             | Tipo de Conteúdo |
| ------ | --------------------- | ------------------------------------------------------------------------------- | ---------------- |
| 200    | Resposta Bem-sucedida | `"string"`                                                                      | application/json |
| 404    | Não Encontrado        | `"string"`                                                                      | application/json |
| 422    | Erro de Validação     | `{ "detail": [ { "loc": ["string", 0], "msg": "string", "type": "string" } ] }` | application/json |

---

**Resumo:**  
Utilize este endpoint para criar execuções de Quick Commands, fornecendo dados de entrada conforme necessário e, opcionalmente, um `conversation_id` para manter o contexto entre execuções. Certifique-se de seguir as restrições dos parâmetros e analisar as respostas para tratar possíveis erros.

**Endpoint de Callback**

O endpoint de callback é utilizado para monitorar o status de execução de um processo. Para isso, é necessário informar o parâmetro de caminho `execution_id`, obtido previamente no endpoint de criação de execução. O monitoramento deve ser feito até que o campo `process.status` retorne o valor `COMPLETED`, indicando que a execução foi finalizada. Nesse momento, o resultado estará disponível no campo `final_result`.

---

### Parâmetros

| Nome          | Obrigatório | Tipo   | Local  | Descrição                 |
| ------------- | ----------- | ------ | ------ | ------------------------- |
| execution_id  | Sim         | string | path   | Identificador da execução |
| authorization | Sim         | string | header | Token de autorização      |

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
