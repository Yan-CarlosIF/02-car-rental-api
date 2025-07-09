# Definição dos Requisitos Funcionais, Requisitos Não Funcionais e Regras de Negócio

## Cadastro de carro

- **RF**

  - Deve ser possível cadastrar um carro.
  - Deve ser possível listar todas as categorias

- **RN**

  - O usuário responsável pelo cadastro deve ser um usuário administrador
  - Não deve ser possivel cadastrar um carro com a mesma placa.
  - Não deve ser possivel atualizar a placa de um carro já cadastrado.
  - O carro deve ser cadastrado, por padrão, com disponibilidade.

## Listagem de carros

- **RF**

  - Deve ser possível listar todos carros disponíveis
  - Deve ser possível listar todos os carros disponíveis pelo nome da categoria
  - Deve ser possível listar todos os carros disponíveis pelo nome da marca
  - Deve ser possível listar todos os carros disponíveis pelo nome do carro

- **RN**

  - O usuário não precisa estar logado no sistema

## Cadastro de Especificação no carro

- **RF**

  - Deve ser possível cadastrar uma especificação para um carro
  - Deve ser possível listar todas as especificações
  - Deve ser possível listar todos os carros

- **RN**

  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado
  - Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
  - O usuário responsável pelo cadastro deve ser um usuário administrador

## Cadastro de imagens do carro

- **RF**

  - Deve ser possível cadastrar a imagem do carro
  - Deve ser possível listar todos os carros

- **RNF**

  - Utilizar o multer para upload dos arquivos

- **RN**

  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
  - O usuário responsável pelo cadastro deve ser um usuário administrador

## Agendamento de aluguel

- **RF**

  - Deve ser possível cadastrar um aluguel

- **RN**

  - O aluguel deve ter duração mínima de 24 horas
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
