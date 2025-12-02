# 🚗 INSTRUCTORS APP - Aplicativo de Conexão com Instrutores de Direção

> **Objetivo:** Conectar pessoas que procuram instrutores de direção com instrutores particulares próximos, permitindo visualização de perfis, filtros por localização e comunicação direta.

---

## 📋 Visão Geral do Projeto

Aplicativo mobile para **usuários finais** que permite:
- Visualizar instrutores de direção próximos à sua localização
- Filtrar instrutores por região específica
- Ver informações detalhadas de cada instrutor
- Entrar em contato e iniciar conversas
- Gerenciar mensagens e conversas ativas

**Design:** Interface clean, moderna e intuitiva com tema relacionado ao contexto de direção/mobilidade.

---

## 👥 Personas e Funcionalidades

### 🎯 Usuário Final (Aluno)
- Buscar instrutores próximos
- Filtrar por região/localização
- Visualizar perfis completos dos instrutores
- Iniciar conversas pelo app
- Gerenciar mensagens pendentes
- Ver histórico de conversas

### 👨‍🏫 Instrutor de Direção (Informações do Perfil)
- Nome completo
- E-mail de contato
- Telefone
- Preço por hora (R$/hora)
- Categorias: Carro, Moto ou Ambos
- Anos de experiência
- Descrição pessoal/bio
- Localização (lat/long)
- Foto de perfil
- Avaliação média (estrelas)
- Número de aulas ministradas

---

## 🎨 Design System e UI/UX

### Paleta de Cores Sugerida
```typescript
primary: {
  100: '#E8F4F8',  // Azul claro suave
  300: '#64B5F6',  // Azul médio
  500: '#2196F3',  // Azul principal (confiança/profissionalismo)
  700: '#1976D2',  // Azul escuro
  900: '#0D47A1'   // Azul muito escuro
},
secondary: {
  100: '#FFF3E0',  // Laranja claro (energia/ação)
  300: '#FFB74D',
  500: '#FF9800',
  700: '#F57C00'
},
success: '#4CAF50',
warning: '#FFC107',
error: '#F44336',
neutral: {
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  500: '#9E9E9E',
  700: '#616161',
  900: '#212121'
}
```

### Componentes Visuais
- **Cards de Instrutor:** Design clean com foto circular, badge de categoria (carro/moto), estrelas de avaliação
- **Mapa Interativo:** Pins customizados para cada instrutor
- **Chat:** Interface moderna estilo WhatsApp/Telegram
- **Filtros:** Chips/tags para seleção rápida
- **Bottom Navigation:** Navegação principal com ícones intuitivos

---

## 🗺️ Estrutura de Navegação

### Bottom Tab Navigator
```
┌─────────────────────────────────────┐
│  [🏠 Início] [💬 Chat] [👤 Perfil]  │
└─────────────────────────────────────┘
```

### Fluxo de Telas

#### 1. Início (Home/Map)
- Tela principal com mapa mostrando instrutores próximos
- Lista em cards abaixo do mapa (scrollable)
- Botão de filtro no topo
- Botão de centralizar na localização do usuário

#### 2. Filtros
- Modal ou tela de filtros:
  - [ ] Raio de distância (5km, 10km, 20km, 50km)
  - [ ] Categoria (Carro, Moto, Ambos)
  - [ ] Faixa de preço
  - [ ] Experiência mínima (anos)
  - [ ] Avaliação mínima (estrelas)
  - [ ] Buscar por região/cidade específica

#### 3. Detalhes do Instrutor
- Header com foto grande e nome
- Badge de categorias (Carro/Moto)
- Informações principais em cards:
  - Preço/hora
  - Experiência
  - Avaliação e número de aulas
  - Contato (telefone/email)
- Bio/descrição completa
- Botão flutuante: "Iniciar Conversa"
- Botão secundário: "Ligar/WhatsApp"

#### 4. Chat (Conversas)
- Lista de conversas ativas
- Badge de mensagens não lidas
- Preview da última mensagem
- Avatar do instrutor
- Timestamp

#### 5. Tela de Mensagens (Conversa Individual)
- Header com nome e foto do instrutor
- Histórico de mensagens
- Input de texto com botão de enviar
- Indicador de "digitando..."
- Status de entrega/leitura (opcional)

#### 6. Perfil do Usuário
- Informações básicas
- Configurações de notificação
- Preferências de localização
- Logout

---

## 📱 Funcionalidades Detalhadas

### 🌍 Geolocalização

#### Permissões Necessárias
- [ ] Solicitar permissão de localização ao abrir o app
- [ ] Usar `expo-location` para obter coordenadas
- [ ] Salvar localização no Zustand store
- [ ] Atualizar localização em background (opcional)

#### Mapa e Pins
- [ ] Implementar `react-native-maps`
- [ ] Criar componente de pin customizado para instrutores
- [ ] Mostrar distância em km do usuário
- [ ] Cluster de pins quando muitos instrutores próximos
- [ ] Ao clicar no pin, abrir card resumido
- [ ] Botão para centralizar no usuário

#### Filtro por Região
- [ ] Input de busca com autocomplete (Google Places)
- [ ] Seleção manual no mapa (desenhar raio)
- [ ] Filtro por cidade/bairro
- [ ] Salvar regiões favoritas

---

### 👨‍🏫 Perfil do Instrutor

#### Schema de Dados (TypeScript)
```typescript
interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  pricePerHour: number; // em reais
  categories: ('car' | 'motorcycle')[];
  yearsOfExperience: number;
  bio: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  rating: number; // 0-5
  totalClasses: number;
  isActive: boolean;
  createdAt: string;
}
```

#### Validação com Zod
```typescript
const instructorSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  avatar: z.string().url().optional(),
  pricePerHour: z.number().positive(),
  categories: z.array(z.enum(['car', 'motorcycle'])).min(1),
  yearsOfExperience: z.number().int().min(0),
  bio: z.string().max(500),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string()
  }),
  rating: z.number().min(0).max(5),
  totalClasses: z.number().int().min(0),
  isActive: z.boolean(),
  createdAt: z.string().datetime()
});
```

---

### 💬 Sistema de Chat

#### Estrutura de Dados

```typescript
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  instructorId: string;
  userId: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}
```

#### Implementação
- [ ] Usar Socket.IO para mensagens em tempo real
- [ ] Criar `chatStore` no Zustand para gerenciar conversas
- [ ] Implementar listeners de eventos:
  - `message:new` - Nova mensagem recebida
  - `message:read` - Mensagem marcada como lida
  - `user:typing` - Indicador de digitação
- [ ] Persistir mensagens localmente (AsyncStorage)
- [ ] Sincronizar com backend ao reconectar

#### Notificações Push
- [ ] Configurar `expo-notifications`
- [ ] Enviar notificação quando nova mensagem chegar (app em background)
- [ ] Badge de contador no ícone do chat

---

## 🔧 Arquitetura Técnica

### Stores (Zustand)

```typescript
// locationStore.ts
interface LocationState {
  userLocation: { latitude: number; longitude: number } | null;
  selectedRegion: Region | null;
  filters: FilterOptions;
  setUserLocation: (location: Coords) => void;
  setFilters: (filters: FilterOptions) => void;
}

// instructorStore.ts
interface InstructorState {
  instructors: Instructor[];
  nearbyInstructors: Instructor[];
  selectedInstructor: Instructor | null;
  fetchInstructors: () => Promise<void>;
  fetchNearby: (coords: Coords) => Promise<void>;
}

// chatStore.ts
interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Record<string, Message[]>;
  unreadTotal: number;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  markAsRead: (conversationId: string) => Promise<void>;
}
```

### API Endpoints

```typescript
// GET /instructors?lat=...&lng=...&radius=...
// GET /instructors/:id
// GET /conversations
// GET /conversations/:id/messages
// POST /conversations
// POST /messages
// PATCH /messages/:id/read
```

### Mocks (src/mocks/)

```typescript
// instructorsMock.ts
export const instructorsMock = {
  GET: async (params) => ({
    data: [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@exemplo.com',
        phone: '+5511999999999',
        avatar: 'https://i.pravatar.cc/150?img=1',
        pricePerHour: 80,
        categories: ['car'],
        yearsOfExperience: 5,
        bio: 'Instrutor experiente com foco em direção defensiva.',
        location: {
          latitude: -23.5505,
          longitude: -46.6333,
          address: 'São Paulo, SP'
        },
        rating: 4.8,
        totalClasses: 250,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      // ... mais instrutores
    ]
  })
};
```

---

## 📦 Componentes Principais

### InstructorCard
```
┌────────────────────────────────────┐
│ 📷 Avatar    João Silva            │
│              ⭐ 4.8 (250 aulas)    │
│              🚗 Carro              │
│              💰 R$ 80/hora         │
│              📍 2.5 km de você     │
└────────────────────────────────────┘
```

### FilterModal
- Sliders para raio e preço
- Chips para categorias
- Star rating para avaliação mínima
- Input para experiência

### MapView Component
- Mapa com pins customizados
- Controle de zoom
- Botão de centralização
- Legenda de categorias

### ChatBubble
- Estilo diferente para enviado/recebido
- Timestamp
- Status de leitura
- Avatar do instrutor

---

## 🚀 Plano de Ação - Desenvolvimento

### Fase 1: Setup e Estrutura Base
- [ ] Criar schemas Zod para Instructor, Message, Conversation
- [ ] Configurar stores no Zustand (locationStore, instructorStore, chatStore)
- [ ] Criar mocks para todos os endpoints
- [ ] Configurar tema com cores do design system
- [ ] Criar tipagens TypeScript para todas as entidades

### Fase 2: Geolocalização e Permissões
- [ ] Implementar hook `useLocation()` para solicitar permissões
- [ ] Criar `LocationPermissionScreen` (caso necessário)
- [ ] Salvar localização do usuário no store
- [ ] Implementar cálculo de distância entre usuário e instrutores

### Fase 3: Tela de Mapa e Lista de Instrutores
- [ ] Criar componente `MapView` com react-native-maps
- [ ] Criar componente `InstructorPin` customizado
- [ ] Implementar `InstructorCard` component
- [ ] Criar tela `HomeScreen` com mapa + lista
- [ ] Implementar busca de instrutores próximos via API/mock
- [ ] Adicionar botão de centralizar no usuário

### Fase 4: Sistema de Filtros
- [ ] Criar componente `FilterModal`
- [ ] Implementar filtros de:
  - [ ] Raio de distância
  - [ ] Categoria (Carro/Moto)
  - [ ] Faixa de preço
  - [ ] Experiência mínima
  - [ ] Avaliação mínima
- [ ] Integrar filtros com a busca de instrutores
- [ ] Adicionar autocomplete de lugares (Google Places)

### Fase 5: Detalhes do Instrutor
- [ ] Criar tela `InstructorDetailScreen`
- [ ] Layout com header de imagem grande
- [ ] Cards de informações (preço, experiência, etc)
- [ ] Seção de bio/descrição
- [ ] Botão "Iniciar Conversa"
- [ ] Botões de contato externo (telefone/WhatsApp)

### Fase 6: Sistema de Chat
- [ ] Configurar Socket.IO para mensagens
- [ ] Criar tela `ConversationsScreen` (lista de chats)
- [ ] Criar componente `ConversationCard`
- [ ] Implementar tela `ChatScreen` (conversa individual)
- [ ] Criar componente `ChatBubble`
- [ ] Implementar envio de mensagens
- [ ] Adicionar indicador de "digitando..."
- [ ] Implementar notificações push para novas mensagens

### Fase 7: Perfil e Configurações
- [ ] Criar tela `ProfileScreen`
- [ ] Adicionar edição de dados básicos
- [ ] Configurações de notificação
- [ ] Preferências de busca/filtros salvos
- [ ] Botão de logout

### Fase 8: Navegação
- [ ] Configurar Bottom Tab Navigator
- [ ] Definir rotas principais (Home, Chat, Profile)
- [ ] Implementar navegação entre telas
- [ ] Adicionar badges de notificação no tab de chat

### Fase 9: Polimento e UX
- [ ] Adicionar loading states em todas as telas
- [ ] Implementar pull-to-refresh nas listas
- [ ] Adicionar empty states (sem instrutores, sem mensagens)
- [ ] Animações de transição (Reanimated)
- [ ] Adicionar Lottie para estados vazios
- [ ] Feedback visual para ações (toasts)

### Fase 10: Testes
- [ ] Criar testes para stores (Zustand)
- [ ] Testar componentes principais
- [ ] Testar fluxo de geolocalização
- [ ] Testar sistema de chat
- [ ] Validar formulários e schemas Zod
- [ ] Testar em modo mock (EXPO_PUBLIC_ENVIRONMENT=test)

### Fase 11: Otimizações
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar cache de dados (React Query)
- [ ] Otimizar re-renders com React.memo
- [ ] Implementar paginação na lista de instrutores
- [ ] Otimizar performance do mapa

### Fase 12: Build e Deploy
- [ ] Testar em dispositivos reais (iOS e Android)
- [ ] Configurar EAS Build
- [ ] Preparar ícones e splash screen
- [ ] Validar todas as permissões
- [ ] Executar `npm run build` e corrigir erros
- [ ] Deploy na Play Store / App Store (se aplicável)

---

## 🎯 Critérios de Sucesso

- [ ] Usuário consegue visualizar instrutores próximos no mapa
- [ ] Filtros funcionam corretamente e atualizam resultados
- [ ] Perfil do instrutor exibe todas as informações necessárias
- [ ] Chat funciona em tempo real via Socket.IO
- [ ] Notificações push chegam quando app está em background
- [ ] Interface é clean, moderna e intuitiva
- [ ] App funciona offline com dados em cache
- [ ] Todos os testes passam (`npm test`)
- [ ] TypeCheck passa sem erros (`npm run typecheck`)
- [ ] Lint passa sem erros (`npm run lint:check`)

---

## 📚 Recursos e Referências

### Bibliotecas Utilizadas
- `expo-location` - Geolocalização
- `react-native-maps` - Mapas
- `socket.io-client` - Chat em tempo real
- `@tanstack/react-query` - Cache e queries
- `zustand` - State management
- `zod` - Validação de dados
- `react-native-google-places-autocomplete` - Busca de lugares
- `expo-notifications` - Push notifications
- `styled-components` - Estilização
- `lottie-react-native` - Animações

### Design Inspiration
- Uber (mapa e localização)
- 99 Táxi (busca de prestadores)
- WhatsApp (chat)
- Airbnb (cards de perfil)

---

## 💡 Melhorias Futuras (V2)

- [ ] Sistema de agendamento de aulas
- [ ] Pagamento integrado no app
- [ ] Histórico de aulas realizadas
- [ ] Sistema de avaliações e reviews
- [ ] Certificados e documentação dos instrutores
- [ ] Vídeos de apresentação dos instrutores
- [ ] Modo instrutor (app dual-mode)
- [ ] Dashboard de estatísticas
- [ ] Suporte a múltiplos idiomas
- [ ] Chat com suporte a imagens/vídeos
- [ ] Integração com calendário

---

> **Dica Final:** Siga o plano de ação marcando cada checkbox conforme concluir. Use os mocks para desenvolver toda a interface antes de integrar com o backend real.
