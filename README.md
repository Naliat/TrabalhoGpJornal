# 🚀 TrabalhoGpJornal: Monorepo FastAPI & React

Este projeto é uma aplicação Full-Stack configurada em um **Monorepo**, utilizando **FastAPI** para o backend (API, Autenticação, CRUD no MongoDB Atlas) e **React/Vite (TSX)** para o frontend.

---

## 1. 📦 Estrutura e Pré-requisitos

### Estrutura
O projeto está dividido em dois diretórios principais, sendo gerenciado a partir da raiz:

* **`backend/`**: Código Python, FastAPI, e lógica CRUD.
* **`frontend/`**: Código React/TypeScript e interface.

### Pré-requisitos
* **Python 3.10+**
* **Node.js & npm**
* Acesso ao seu cluster **MongoDB Atlas**.

```
uvicorn backend.app.main:app --reload
```