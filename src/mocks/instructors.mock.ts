import { Instructor } from '@/schemas/instructor.schema';

export const mockInstructors: Instructor[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+5511999999001',
    avatar: 'https://i.pravatar.cc/150?img=12',
    pricePerHour: 80,
    categories: ['car'],
    yearsOfExperience: 5,
    bio: 'Instrutor experiente com foco em direção defensiva e preparação para exame prático. Paciente e dedicado ao ensino.',
    location: {
      latitude: -23.5505,
      longitude: -46.6333,
      address: 'Av. Paulista, São Paulo - SP',
    },
    rating: 4.8,
    totalClasses: 250,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+5511999999002',
    avatar: 'https://i.pravatar.cc/150?img=5',
    pricePerHour: 100,
    categories: ['car', 'motorcycle'],
    yearsOfExperience: 8,
    bio: 'Instrutora certificada para carro e moto. Especialista em aulas para mulheres e superação do medo de dirigir.',
    location: {
      latitude: -23.5629,
      longitude: -46.6544,
      address: 'Vila Mariana, São Paulo - SP',
    },
    rating: 4.9,
    totalClasses: 380,
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '+5511999999003',
    avatar: 'https://i.pravatar.cc/150?img=15',
    pricePerHour: 70,
    categories: ['car'],
    yearsOfExperience: 3,
    bio: 'Jovem instrutor dinâmico, com método moderno de ensino. Ótimo para primeira habilitação.',
    location: {
      latitude: -23.5489,
      longitude: -46.6388,
      address: 'Consolação, São Paulo - SP',
    },
    rating: 4.6,
    totalClasses: 120,
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Ana Paula Costa',
    email: 'ana.costa@email.com',
    phone: '+5511999999004',
    avatar: 'https://i.pravatar.cc/150?img=9',
    pricePerHour: 90,
    categories: ['motorcycle'],
    yearsOfExperience: 6,
    bio: 'Especialista em motocicletas. Ex-piloto de competição, ensino técnicas avançadas de pilotagem segura.',
    location: {
      latitude: -23.5733,
      longitude: -46.6417,
      address: 'Ipiranga, São Paulo - SP',
    },
    rating: 4.7,
    totalClasses: 190,
    isActive: true,
    createdAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@email.com',
    phone: '+5511999999005',
    avatar: 'https://i.pravatar.cc/150?img=33',
    pricePerHour: 85,
    categories: ['car'],
    yearsOfExperience: 10,
    bio: 'Mais de 10 anos de experiência. Especialista em trânsito urbano de São Paulo e preparação intensiva para CNH.',
    location: {
      latitude: -23.5431,
      longitude: -46.6291,
      address: 'Jardins, São Paulo - SP',
    },
    rating: 4.9,
    totalClasses: 450,
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '+5511999999006',
    avatar: 'https://i.pravatar.cc/150?img=20',
    pricePerHour: 75,
    categories: ['car'],
    yearsOfExperience: 4,
    bio: 'Instrutora paciente e atenciosa. Foco em alunos com dificuldades de aprendizado e ansiedade.',
    location: {
      latitude: -23.5589,
      longitude: -46.6458,
      address: 'Bela Vista, São Paulo - SP',
    },
    rating: 4.8,
    totalClasses: 200,
    isActive: true,
    createdAt: '2024-01-06T00:00:00Z',
  },
];

interface GetInstructorsParams {
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export const instructorsMock = {
  GET: async (params?: GetInstructorsParams) => {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredInstructors = [...mockInstructors];

    // Se tiver coordenadas, poderia filtrar por distância
    // Por enquanto, retorna todos
    if (params?.latitude && params?.longitude) {
      // Aqui você poderia calcular a distância e filtrar
      // Por simplicidade, vamos retornar todos
    }

    return {
      data: filteredInstructors,
      total: filteredInstructors.length,
    };
  },

  GET_BY_ID: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const instructor = mockInstructors.find((i) => i.id === id);

    if (!instructor) {
      throw new Error('Instrutor não encontrado');
    }

    return {
      data: instructor,
    };
  },
};
