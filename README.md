# 🗂️ Taskflow

Gerenciador de tarefas feito com **React**, **TypeScript** e **Firebase**.  
Autenticação via Firebase, tarefas por usuário e dados na nuvem (Firestore).

<p align="left">
  <a href="https://github.com/SEU_USUARIO/taskflow"><img alt="Repo size" src="https://img.shields.io/github/repo-size/SEU_USUARIO/taskflow?style=flat-square"></a>
  <a href="https://github.com/SEU_USUARIO/taskflow/issues"><img alt="Issues" src="https://img.shields.io/github/issues/SEU_USUARIO/taskflow?style=flat-square"></a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square">
</p>

> **Demo/Screenshots**  
> Adicione aqui GIFs ou imagens da interface (ex.: `./docs/preview-1.png`).

---

## ✨ Funcionalidades

- 🔐 **Autenticação**: cadastro e login (email/senha) via Firebase Authentication.
- ✅ **Tarefas**: criar, editar, concluir e excluir.
- 👤 **Multiusuário**: cada usuário vê apenas suas próprias tarefas.
- ☁️ **Persistência**: dados salvos no Firestore.
- 📱 **Responsivo**: UI que se adapta a diferentes tamanhos de tela.

---

## 🧰 Tecnologias

- **React** + **TypeScript**
- **Vite**
- **Firebase** (Authentication, Firestore)
- **ESLint/Prettier** (opcional)

---

## 📦 Pré-requisitos

- **Node.js** ≥ 18
- **npm** (ou **pnpm**/**yarn**)
- Conta e projeto no **Firebase**

---

## ⚙️ Configuração do Firebase

1. Crie um projeto em <https://console.firebase.google.com>.
2. Ative:
   - **Authentication** → método **Email/Password**.
   - **Cloud Firestore** → modo de produção.
3. Obtenha as credenciais Web do app Firebase e crie um arquivo `.env` na raiz:

```env
# .env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=1:xxxx:web:xxxx
