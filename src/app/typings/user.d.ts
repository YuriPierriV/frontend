export interface User {
    id?: number;
    nome?: string;
    sobrenome?: string;
    email?: string;
    telefone?: string;
    senha?: string;
    image?: any;  // tipo Blob
    img_link?: string;
    tipo?: 'professor' | 'aluno';
    genero?: 'masculino' | 'feminino' | 'outro';
    nascimento?: string;  // Pode ser ajustado para Date se necessário
    create_time?: string;  // Pode ser ajustado para Date se necessário
    update_time?: string;  // Pode ser ajustado para Date se necessário
    confirmed?: boolean;
  }