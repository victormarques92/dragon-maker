# 🐉 Dragon Maker

Aplicação web criada com **React**, **Vite**, **TypeScript** e **Material UI**, que permite criar e gerenciar contatos com uma interface moderna e responsiva.

## 🔗 Acesse o site

> [https://dragon-maker.vercel.app](https://dragon-maker.vercel.app)

## 📦 Tecnologias principais

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Google Maps API](https://www.npmjs.com/package/@react-google-maps/api)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Yup](https://github.com/jquense/yup)

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dragon-maker.git
cd dragon-maker
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O projeto será acessível em: `http://localhost:5173`

## 🛠️ Outros comandos úteis

- **Build para produção**
  `npm run build`

- **Pré-visualização do build**
  `npm run preview`

- **Lint do projeto**
  `npm run lint`

## 🧪 Variáveis de ambiente

Para utilizar recursos como **Google Maps**, crie um arquivo `.env` com a seguinte variável:

```env
VITE_GOOGLE_MAPS_API_KEY=ADD_YOUR_KEY
VITE_GOOGLE_MAPS_BASE_URL=ADD_YOUR_KEY
VITE_VIA_CEP_BASE_URL=ADD_YOUR_KEY
```