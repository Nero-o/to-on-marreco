# To-On-Marreco

To-On-Marreco é um aplicativo desenvolvido em React Native para gerenciar a disponibilidade de jogadores para partidas online com amigos. O app permite que os usuários se cadastrem, criem ou entrem em grupos, e indiquem sua disponibilidade com um simples botão de "Pronto". Quando todos os membros de um grupo estiverem prontos, uma notificação é enviada a todos.

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login via email e senha.
- **Gerenciamento de Grupos**:
  - Criação de grupos.
  - Entrar em grupos através de links de convite.
  - Sair de grupos.
  - Diferenciação de papéis: Admin e Membro.
  - Admins podem remover membros do grupo.
- **Notificações**:
  - Notificações quando um membro fica disponível.
  - Notificação final quando todos os membros estão prontos.

## Tecnologias Utilizadas

- **Frontend**:
  - React Native
  - Expo
  - TypeScript
  - React Navigation
- **Backend**:
  - Firebase (Auth, Firestore, Cloud Functions, Cloud Messaging)
- **Testes**:
  - Jest
  - ts-jest

## Arquitetura

O aplicativo segue os princípios da **Clean Architecture**, dividindo o projeto em camadas distintas para garantir separação de responsabilidades e facilitar a manutenção e evolução do código.

- **Domain (Domínio)**: Contém as entidades, casos de uso e interfaces dos repositórios.
- **Data (Dados)**: Implementações concretas dos repositórios, interagindo com o Firebase.
- **Presentation (Apresentação)**: UI, componentes, navegação e hooks personalizados.
- **App**: Ponto de entrada do aplicativo.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- **Node.js**: [Download](https://nodejs.org/)
- **Yarn**: [Instalação](https://classic.yarnpkg.com/lang/en/docs/install/)
- **Expo CLI**: Instalado globalmente
  ```bash
  yarn global add expo-cli

### Passos para Configuração

#### 1. Clonar o Repositório

```` bash
git clone https://github.com/seu-usuario/to-on-marreco.git

cd to-on-marreco
````
#### 2. Instalar Dependências
```` bash
yarn install
````

#### 3. Configurar o Firebase
- Crie um projeto no Firebase Console.
- Ative os serviços necessários: Auth, Firestore, Cloud Functions, Cloud Messaging e Dynamic Links.
- Obtenha as credenciais do Firebase e configure no projeto:
    - Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente:
    ```` env
    FIREBASE_API_KEY=your_api_key
    FIREBASE_AUTH_DOMAIN=your_auth_domain
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_STORAGE_BUCKET=your_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    FIREBASE_APP_ID=your_app_id
    FIREBASE_MEASUREMENT_ID=your_measurement_id
    ````
#### 4. Iniciar o Projeto
```` bash
yarn start
````
- Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code e testar o app.

#### 5. Executar Testes
 1. Configurar Jest com TypeScript
- Assegure-se de que todas as dependências de teste estão instaladas
```` bash 
yarn add --dev jest @types/jest ts-jest
````
- Inicialize a configuração do ts-jest:
```` bash
npx ts-jest config:init

````
- Verifique o arquivo jest.config.js gerado para garantir que está correto.
2. Rodar Testes
```` bash
yarn test
````

## Guia de Uso
### Cadastro e Login
#### 1. Cadastro:
- Abra o aplicativo.
- Navegue até a tela de cadastro.
- Insira seu email e senha.
- Clique em "Cadastrar".
#### 2. Login:

- Na tela inicial, insira seu email e senha.
- Clique em "Login".
- Gerenciamento de Grupos
#### 3. Criar Grupo:
- Após o login, clique em "Criar Grupo".
- Insira o nome do grupo.
- Compartilhe o link de convite com amigos.
#### 4. Entrar em Grupo:

- Receba o link de convite.
- Clique no link para abrir o aplicativo.
- Se estiver logado, será adicionado automaticamente ao grupo.
- Se não estiver logado, faça o login/cadastro primeiro.
#### 5. Sair de Grupo:

- Navegue até os detalhes do grupo.
- Clique em "Sair do Grupo".
- Se for o Admin, o grupo será desfeito e apagado.
- Se for um Membro, você será removido do grupo.
#### 6. Remover Membros (Admins apenas):

- Como Admin, navegue até os membros do grupo.
- Clique em "Remover" ao lado do membro que deseja remover.
#### 7. Notificações
#####  - Membros Disponíveis:
- Quando um membro clicar em "Pronto", todos os outros membros receberão uma notificação informando que esse membro está disponível.
##### - Todos Prontos:
- Quando todos os membros de um grupo estiverem prontos, todos receberão uma notificação final indicando que todos estão disponíveis para jogar.

## Arquitetura Detalhada
### Camada de Domínio (Domain)
- Entidades:
    - `User`: Representa um usuário do aplicativo.
    - `Group`: Representa um grupo de amigos para jogar.
- Repositórios:
    - `UserRepository`: Interface para operações relacionadas ao usuário.
    - `GroupRepository`: Interface para operações relacionadas aos grupos.
- Casos de Uso:
    - `SignUpUser`, `LoginUser`, `CreateGroup`, `JoinGroup`, `LeaveGroup`, `RemoveMember`, `GetGroupDetails`, `SetMemberReady`.
### Camada de Dados (Data)
- Implementações dos Repositórios:
    - `UserRepositoryImpl`: Implementa UserRepository usando Firebase Auth e Firestore.
    - `GroupRepositoryImpl`: Implementa GroupRepository usando Firestore e Cloud Functions.
- Fontes de Dados:
    - Firebase Auth para autenticação.
    - Firestore para armazenamento de dados de grupos e usuários.
### Camada de Apresentação (Presentation)
- Componentes e Telas:
    - Telas de Login, Cadastro, Criação de Grupo, Detalhes do Grupo, etc.
- Navegação:
- Configurada com React Navigation, separando stacks conforme a autenticação e gerenciamento de grupos.
- Hooks Personalizados:
- Hooks para encapsular lógica de negócio e interação com casos de uso.
