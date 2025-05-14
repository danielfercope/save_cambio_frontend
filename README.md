# Conversor de Moedas em Tempo Real

Este projeto implementa um conversor de moedas em tempo real utilizando uma API externa de taxas de câmbio. Ele também oferece um histórico das últimas conversões realizadas. O frontend é desenvolvido em **React**, enquanto o backend utiliza **Node.js** para realizar a conversão e fornecer o histórico.

## Funcionalidades

- **Conversão de moedas:** Converta qualquer valor entre diferentes moedas suportadas.
- **Histórico de conversões:** Veja as últimas conversões realizadas.
- **Modo escuro:** Ative e desative o modo escuro de forma simples.
- **Seleção de moedas:** Escolha moedas de origem e destino para a conversão.

## Requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** para gerenciamento de pacotes
- **API Key** para a API de conversão de moedas (disponível em [https://exchangerate-api.com/](https://exchangerate-api.com/))

Impotante: para funcionamento integral é necessário um arquivo .env na raiz do projeto contendo os valores requeridos.

## Como executar o projeto
### Passo 1: Clonar o repositório

```bash
git clone https://github.com/danielfercope/save_cambio_frontend.git

### Passo 2: Instale as dependências do projeto utilizando npm ou yarn.
cd save_cambio_frontend
npm install

### Passo 3: Inicie o projeto.
npm run dev
