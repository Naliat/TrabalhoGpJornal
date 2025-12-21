# Boas Práticas de Importação no Frontend


---

## 1. Ordem lógica de importações

As importações devem seguir uma ordem do **mais genérico** para o **mais específico**, facilitando a leitura imediata do arquivo.

### Ordem recomendada

1. Bibliotecas do React  
2. Bibliotecas externas  
3. Hooks customizados  
4. Componentes globais (compartilhados)  
5. Componentes locais  
6. Tipos, interfaces e enums  
7. Estilos e assets  

---

## 2. Estrutura recomendada

### Exemplo correto

```ts
import { useState } from "react";
import { Link } from "react-router-dom";

import Logotype from "../../components/Logotype/Logotype";

import LoginForm from "./components/LoginForm";
import LoginInfoCard from "./components/LoginInfoCard";

import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

import styles from "./Login.module.css";
```