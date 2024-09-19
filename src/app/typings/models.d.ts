export interface UsuarioCompleto {
    usuario?: Usuario;
    aluno?: Aluno ;
    professor?: Professor ;
    instituicao?: Instituicao ;
    turmas?: Turma[];
    cursos?: Curso[];
    unidades?: Unidade[];
    convites_professores?: ConviteProfessor[];
    turmas_alunos?: TurmaAluno[];
    turmas_cursos?: TurmaCurso[];
    professores_unidades?: ProfessorUnidade[];
}

export interface Usuario {
    credential?: any;
    id?: number;
    nome?: string;
    sobrenome?: string;
    email?: string;
    telefone?: string;
    senha?: string;  // Armazenamento do hash
    image?: Uint8Array;  // Utilizando Uint8Array para representar bytes
    img_link?: string;
    tipo?: 'professor' | 'aluno' | 'instituicao';
    genero?: 'masculino' | 'feminino' | 'outro';
    nascimento?: string;  // Pode ser ajustado para Date se necessário
    create_time?: string;  // Pode ser ajustado para Date se necessário
    update_time?: string;  // Pode ser ajustado para Date se necessário
    confirmed?: boolean;
    professor?: Professor;
    aluno?: Aluno;
    instituicao?: Instituicao;
    mensagens_enviadas?:any;
    mensagens_recebidas?:any;
}

export interface Professor {
    id?: number;
    id_usuario?: number;
    usuario?: Usuario;
    turmas?: Turma[];
    cursos?: Curso[];
    unidade: ProfessorUnidade[];
    convites: ConviteProfessor[];
}

export interface Aluno {
    id?: number;
    id_usuario?: number;
    matricula?: string;
    usuario?: Usuario;
    turmas?: TurmaAluno[];
}

export interface Turma {
    id?: number;
    nome?: string;
    id_professor?: number;
    inicio?: string;  // Pode ser ajustado para Date se necessário
    fim?: string;  // Pode ser ajustado para Date se necessário
    periodo?: string;
    create_time?: string;  // Pode ser ajustado para Date se necessário
    professor?: Professor;
    alunos?: TurmaAluno[];
    turmas_cursos?: TurmaCurso[];
}

export interface TurmaAluno {
    id_turma?: number;
    id_aluno?: number;
    turma?: Turma;
    aluno?: Aluno;
}

export interface Curso {
    id?: number;
    nome?: string;
    id_unidade?: number;
    id_professor?: number;
    descricao?: string;
    confirmed?: boolean;
    create_time?: string;  // Pode ser ajustado para Date se necessário
    update_time?: string;  // Pode ser ajustado para Date se necessário
    unidade?: Unidade;
    professor?: Professor;
    turmas_cursos?: TurmaCurso[];
}

export interface Unidade {
    id: number;
    nome: string;
    id_instituicao: number;
    estado: string;
    cidade: string;
    bairro: string;
    endereco:string;
    telefone?: string;
    cep: string;
    confirmed: boolean;
    create_time: string;  // Pode ser ajustado para Date se necessário
    update_time: string;  // Pode ser ajustado para Date se necessário
    cursos?: Curso[];
    instituicao?: Instituicao;
    professores?: ProfessorUnidade[];
    convites?: ConviteProfessor[];
}

export interface Instituicao {
    id: number;
    id_usuario: number;
    nome: string;
    create_time: string;  // Pode ser ajustado para Date se necessário
    update_time: string;  // Pode ser ajustado para Date se necessário
    confirmed?: boolean;
    unidades?: Unidade[];
    usuario?: Usuario;
}

export interface TurmaCurso {
    id_turma?: number;
    id_curso?: number;
    turma?: Turma;
    curso?: Curso;
}

export interface ProfessorUnidade {
    id_unidade?: number;
    id_professor?: number;
    unidade?: Unidade;
    professor?: Professor;
}

export interface ConviteProfessor {
    id?: number;
    id_unidade?: number;
    id_professor?: number;
    email_professor?: string;
    status?: 'pendente' | 'aceito' | 'recusado';
    create_time?: string;  // Pode ser ajustado para Date se necessário
    data_resposta?: string;  // Pode ser ajustado para Date se necessário
    unidade?: Unidade;
    professor?: Professor;
}
