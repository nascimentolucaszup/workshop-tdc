# Descrição do projeto

## Escopo macro

Recebemos uma demanda para criar um produto interno que aumente a eficiência da nossa equipe nos disparos de notificações. O objetivo é implantar um sistema que utilize modelos de LLM para sugerir notificações mais engajadoras para o nosso e-commerce.

**Contexto e Estratégia**

- Inicialmente, focaremos em tópicos de compras e tecnologia relacionados aos nossos produtos.
- Utilizaremos um agente especializado para coletar e compilar informações de portais de conteúdo, extraindo artigos dos principais veículos de notícias. O objetivo é identificar padrões de consumo que possam enriquecer o contexto das recomendações.
- Também integraremos opiniões e reviews dos nossos compradores, aproveitando essas informações como fontes de conhecimento (Knowledge Sources) para alimentar nossos agentes.

**Solução Tecnológica**

Como nosso time é pequeno, optamos por não criar toda a infraestrutura necessária para suportar uma arquitetura completa de LLM, agentes e RAG/CAG. Por isso, utilizaremos a StackSpot AI, uma plataforma governada e segura, que oferece diversos modelos prontos para acelerar o desenvolvimento do nosso produto, desde a concepção até a entrega de valor ao negócio.

**Principais Atividades do Time de Desenvolvimento**

1. Extrair informações de trends topics relevantes.
2. Criação de Conteúdos na StackSpot AI:
    - Desenvolver **Stacks AI** para auxiliar no processo de desenvolvimento.
    - Criar **agentes especializados** para:
        - Extração de informações diretamente da internet.
        - Criação de conteúdos voltados para o disparo de notificações.
    - Implementar um **Quick Command** capaz de orquestrar o fluxo de trabalho entre múltiplos agentes.
    - Alternativamente, utilizar o recurso de **Multiagents nativo**, configurando um agente orquestrador para essa atividade.
3. Criar uma interface para que a equipe de marketing possa supervisionar e refinar as recomendações de notificações.

Dessa forma, conseguiremos focar no que realmente importa: gerar valor para o negócio, utilizando tecnologia de ponta de maneira eficiente e escalável.

## **Requisitos Técnicos**

### 1. Tela de seleção dos trends topics

As informações de tendências são extraídas do Google Trends a cada uma hora. Realizamos um recorte desses dados e os armazenamos no seguinte formato:
```json
[
  {
    "termo": "iphone 15",
    "pesquisas": "20 mil+ pesquisas",
    "variacao": "50%",
    "data": "há 4 dias",
    "duracao": "Durou 2 dias 16h"
  },
  {
    "termo": "latest xbox",
    "pesquisas": "10 mil+ pesquisas",
    "variacao": "1.000%",
    "data": "há 4 dias",
    "duracao": "Durou 1 dia 4h"
  }
  // demais registros
]
```
Os arquivos encontram-se em: `docs/db`.

Com esses dados em JSON, o objetivo é criar uma API que simule um fluxo o mais próximo possível do real.

---

### 2. Tela de contexto adicional

Nesta etapa do step-by-step, será disponibilizada uma tela com campos para adicionar informações extras, como: público-alvo, faixa etária, tom da linguagem, entre outros. A proposta é manter a interface intuitiva, com poucos campos, apenas incentivando o usuário a fornecer informações adicionais caso deseje.

---

### 3. Tela de geração de recomendações de notificaçõe

Esta etapa integra agentes da StackSpot AI, responsáveis por:

- **Buscar informações adicionais na internet** com base nos trends topics, utilizando um agente especializado em pesquisa de conteúdo relevante para consumo.
- **Relacionar os trends topics com produtos** por meio de um agente que acessa um Knowledge Source específico contendo informações dos produtos.
- **Gerar recomendações de marketing** com um agente especializado em estratégias de marketing, storytelling, gatilhos de conteúdo, entre outros.

#### Exemplos de Integração com StackSpot

- **Autenticação:**
```curl
  # Autenticar e obter JWT
  export JWT=$(curl -s "https://idm.stackspot.com//oidc/oauth/token" \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -d 'grant_type=client_credentials' \
     -d "client_id=" \
     -d "client_secret=" | jq -r '.access_token')
```

- **Chamada dos agentes:**
```curl
  # Interagir com o agente
  curl 'https://genai-inference-app.stackspot.com/v1/agent/01J8NT5H4SPKSV2VP829ZAT2A5/chat' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer " \
    -d "{
      \"streaming\": true,
      \"user_prompt\": \"\",
      \"stackspot_knowledge\": false,
      \"return_ks_in_response\": true
    }"
```
---

**Resumo:**  
O fluxo proposto envolve a coleta periódica de tendências, a oferta de uma interface para contexto adicional e a geração de recomendações inteligentes por meio de agentes integrados à StackSpot AI, garantindo um processo automatizado, intuitivo e alinhado às melhores práticas de marketing e tecnologia. 