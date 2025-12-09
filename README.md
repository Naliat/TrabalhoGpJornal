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
### É necessario a necessedidade de logar para puder cadastrar

### post/editais/

```
{
  "title": "Edital de Bolsas 2026",
  "descricao": "Processo seletivo para bolsas de estudo.",
  "data_inicio": "2025-12-15T00:00:00",
  "data_fim": "2026-01-15T23:59:59",
  "tags": ["bolsa", "universidade", "2026"]
}

```

### Saida

```
{
  "id": "675f1c2a9d8f4e1234567890",
  "title": "Edital de Bolsas 2026",
  "descricao": "Processo seletivo para bolsas de estudo.",
  "data_inicio": "2025-12-15T00:00:00",
  "data_fim": "2026-01-15T23:59:59",
  "tags": ["bolsa", "universidade", "2026"],
  "professor_id": "692b9344b32722a4e50f8366",
  "professor_username": "Tailan de Souza",
  "created_at": "2025-12-09T23:07:46.853000"
}

```