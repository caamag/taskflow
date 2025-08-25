# 🗂️ Taskflow

## ✨ Funcionalidades

- 🔐 **Autenticação**: cadastro e login (email/senha) via Firebase Authentication.
- ✅ **Tarefas**: criar, editar, concluir e excluir.
- 👤 **Multiusuário**: cada usuário vê apenas suas próprias tarefas.
- ☁️ **Persistência**: dados salvos no Firestore.

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
