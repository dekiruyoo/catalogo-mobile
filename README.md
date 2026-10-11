# 🛍️ Catálogo Interativo Mobile

Aplicativo mobile em **React Native (Expo)** para listagem de produtos por categoria, consumindo a API pública [DummyJSON](https://dummyjson.com/docs). Projeto da disciplina **Mobile Development** – UniFECAF.

## ✨ Funcionalidades

- **Login simulado** com validação de e-mail e senha (mínimo 6 caracteres); dados do usuário guardados no Redux.
- **Lista de produtos com abas** (Masculino / Feminino) e filtro por subcategoria (chips).
  - Masculino: `mens-shirts`, `mens-shoes`, `mens-watches`
  - Feminino: `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`
- **Detalhes do produto** (nome, imagem, descrição, preço, desconto) via `GET /products/{id}`.
- **Logout** que limpa todo o estado (usuário e produtos) e volta ao login.
- Estados de **carregamento** e **erro** com botão "Tentar novamente".

## 🧰 Tecnologias

- React Native + Expo
- Axios (consumo da API)
- Redux Toolkit + React Redux (estado global e `createAsyncThunk`)
- React Navigation (Native Stack + Bottom Tabs)

## 📁 Estrutura

```
src/
├── components/   # ProductCard, CategoryChips, Loading, ErrorMessage
├── navigation/   # AppNavigator (Stack + Tabs, rotas condicionais por login)
├── screens/      # LoginScreen, ProductListScreen, ProductDetailsScreen
├── services/     # api.js (instância Axios e chamadas HTTP)
├── store/        # authSlice, productsSlice, store
├── theme/        # cores
└── utils/        # validators, format
```

Separação de responsabilidades: **services** (HTTP) → **store** (lógica/estado) → **screens/components** (renderização) → **theme** (estilo).

## ▶️ Como executar

Pré-requisitos: Node.js 18+ e o app **Expo Go** no celular (ou um emulador).

```bash
npm install
npx expo start
```

Escaneie o QR Code com o Expo Go (Android) ou com a câmera (iOS).

Alternativamente, instale o react-dom e react-native-web e inicie com --web.

```bash
npm install
npx expo install react-dom react-native-web
pnx expo start --web
```

**Credenciais de teste:** qualquer e-mail válido (ex.: `aluno@email.com`) e senha com 6+ caracteres.

<img src="./img/Pasted image 1.png" width="250"><img src="./img/Pasted image 2.png" width="250"><img src="./img/Pasted image 3.png" width="250">

## 👤 Autora

Lisa Goes Silva - 100804
