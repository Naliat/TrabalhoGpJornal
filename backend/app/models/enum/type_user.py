from enum import Enum

class UserType(str, Enum):
    """Enumeração para os tipos de usuários do sistema."""
    ADM = "ADM"
    PROFESSOR = "PROFESSOR"
    ALUNO = "ALUNO"