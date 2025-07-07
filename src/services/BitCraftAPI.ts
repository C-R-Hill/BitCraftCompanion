import axios from 'axios';

// Configuration
const API_BASE_URL = process.env.BITCRAFT_API_BASE || 'http://localhost:3000/api';
const API_KEY = process.env.BITCRAFT_API_KEY || 'mock-key';

// Mock data for development
const MOCK_WORLD_MAP = {
  id: '1',
  name: 'BitCraft World',
  size: { width: 1000, height: 1000 },
  claims: [
    {
      id: '1',
      name: 'New Haven',
      owner: 'Player1',
      coordinates: { x: 100, y: 100 },
      status: 'active',
      resources: [
        { id: '1', name: 'Wood', type: 'wood', quantity: 150, maxQuantity: 200, coordinates: { x: 100, y: 100 } },
        { id: '2', name: 'Stone', type: 'stone', quantity: 75, maxQuantity: 100, coordinates: { x: 100, y: 100 } }
      ]
    },
    {
      id: '2',
      name: 'Iron Forge',
      owner: 'Player2',
      coordinates: { x: 200, y: 150 },
      status: 'active',
      resources: [
        { id: '3', name: 'Iron', type: 'iron', quantity: 50, maxQuantity: 100, coordinates: { x: 200, y: 150 } }
      ]
    }
  ],
  resources: [
    { id: '1', name: 'Wood', type: 'wood', quantity: 150, maxQuantity: 200, coordinates: { x: 100, y: 100 } },
    { id: '2', name: 'Stone', type: 'stone', quantity: 75, maxQuantity: 100, coordinates: { x: 100, y: 100 } },
    { id: '3', name: 'Iron', type: 'iron', quantity: 50, maxQuantity: 100, coordinates: { x: 200, y: 150 } },
    { id: '4', name: 'Gold', type: 'gold', quantity: 25, maxQuantity: 50, coordinates: { x: 300, y: 200 } }
  ]
};

const MOCK_CHAT_MESSAGES = [
  {
    id: '1',
    sender: 'Player1',
    message: 'Welcome to BitCraft! Anyone want to form an empire?',
    timestamp: new Date(Date.now() - 3600000),
    channel: 'global'
  },
  {
    id: '2',
    sender: 'Player2',
    message: 'I have a claim near the iron deposits. Looking for partners!',
    timestamp: new Date(Date.now() - 1800000),
    channel: 'global'
  },
  {
    id: '3',
    sender: 'Player3',
    message: 'Great work on the new settlement!',
    timestamp: new Date(Date.now() - 900000),
    channel: 'empire'
  }
];

const MOCK_USER_CLAIMS = [
  {
    id: '1',
    name: 'My First Claim',
    coordinates: { x: 100, y: 100 },
    status: 'active',
    resources: [
      { id: '1', name: 'Wood', quantity: 150, maxQuantity: 200 },
      { id: '2', name: 'Stone', quantity: 75, maxQuantity: 100 }
    ]
  }
];

const MOCK_USER_EMPIRES = [
  {
    id: '1',
    name: 'The Builders Guild',
    members: [
      { id: '1', username: 'Player1', email: 'player1@example.com' },
      { id: '2', username: 'Player2', email: 'player2@example.com' }
    ],
    claims: [
      { id: '1', name: 'My First Claim', coordinates: { x: 100, y: 100 }, status: 'active' }
    ]
  }
];

// API Client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'BitCraft-Companion-App/1.0.0'
  }
});

// Interceptor for mock data fallback
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.warn('API call failed, using mock data:', error.message);
    return Promise.resolve({ data: { success: true, data: null } });
  }
);

export class BitCraftAPI {
  // World Map
  static async getWorldMap(bounds?: string) {
    try {
      const response = await apiClient.get('/bitcraft/world-map', {
        params: { bounds }
      });
      return response.data.data || MOCK_WORLD_MAP;
    } catch (error) {
      console.log('Using mock world map data');
      return MOCK_WORLD_MAP;
    }
  }

  // User Claims
  static async getUserClaims(userId: string) {
    try {
      const response = await apiClient.get('/bitcraft/claims', {
        params: { user_id: userId }
      });
      return response.data.data || MOCK_USER_CLAIMS;
    } catch (error) {
      console.log('Using mock user claims data');
      return MOCK_USER_CLAIMS;
    }
  }

  // User Empires
  static async getUserEmpires(userId: string) {
    try {
      const response = await apiClient.get('/bitcraft/empires', {
        params: { user_id: userId }
      });
      return response.data.data || MOCK_USER_EMPIRES;
    } catch (error) {
      console.log('Using mock user empires data');
      return MOCK_USER_EMPIRES;
    }
  }

  // Chat Messages
  static async getChatMessages(channel: string) {
    try {
      const response = await apiClient.get('/chat/messages', {
        params: { channel }
      });
      return response.data.data || MOCK_CHAT_MESSAGES;
    } catch (error) {
      console.log('Using mock chat messages data');
      return MOCK_CHAT_MESSAGES.filter(msg => msg.channel === channel);
    }
  }

  // Send Chat Message
  static async sendChatMessage(message: string, channel: string) {
    try {
      const response = await apiClient.post('/chat/messages', {
        message,
        channel
      });
      return response.data;
    } catch (error) {
      console.log('Mock: Message sent successfully');
      return { success: true, data: { id: Date.now().toString(), message, channel } };
    }
  }

  // Server Status
  static async getServerStatus() {
    try {
      const response = await apiClient.get('/bitcraft/server-status');
      return response.data.data || {
        status: 'online',
        players: 1250,
        uptime: '99.9%',
        version: '1.0.0-alpha'
      };
    } catch (error) {
      console.log('Using mock server status');
      return {
        status: 'online',
        players: 1250,
        uptime: '99.9%',
        version: '1.0.0-alpha'
      };
    }
  }

  // Resources in Area
  static async getResourcesInArea(x: number, y: number, radius: number = 100) {
    try {
      const response = await apiClient.get('/bitcraft/resources', {
        params: { x, y, radius }
      });
      return response.data.data || MOCK_WORLD_MAP.resources;
    } catch (error) {
      console.log('Using mock resources data');
      return MOCK_WORLD_MAP.resources;
    }
  }

  // Search Players
  static async searchPlayers(query: string, limit: number = 10) {
    try {
      const response = await apiClient.get('/bitcraft/search/players', {
        params: { query, limit }
      });
      return response.data.data || [
        { id: '1', username: 'Player1', online: true },
        { id: '2', username: 'Player2', online: false },
        { id: '3', username: 'Player3', online: true }
      ];
    } catch (error) {
      console.log('Using mock player search data');
      return [
        { id: '1', username: 'Player1', online: true },
        { id: '2', username: 'Player2', online: false },
        { id: '3', username: 'Player3', online: true }
      ];
    }
  }
}

export default BitCraftAPI; 