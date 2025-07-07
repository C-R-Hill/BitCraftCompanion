import React, {createContext, useContext, useState, useEffect} from 'react';
import BitCraftAPI from '../services/BitCraftAPI';

interface WorldMap {
  id: string;
  name: string;
  size: {
    width: number;
    height: number;
  };
  claims: Claim[];
  resources: Resource[];
}

interface Claim {
  id: string;
  name: string;
  owner: string;
  coordinates: {
    x: number;
    y: number;
  };
  status: 'active' | 'inactive' | 'under_attack';
  resources: Resource[];
}

interface Resource {
  id: string;
  name: string;
  type: 'wood' | 'stone' | 'iron' | 'gold' | 'food' | 'water';
  quantity: number;
  maxQuantity: number;
  coordinates: {
    x: number;
    y: number;
  };
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  channel: 'global' | 'empire' | 'claim';
}

interface BitCraftContextType {
  worldMap: WorldMap | null;
  chatMessages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  fetchWorldMap: () => Promise<void>;
  fetchChatMessages: (channel: string) => Promise<void>;
  sendChatMessage: (message: string, channel: string) => Promise<void>;
  fetchClaimStatus: (claimId: string) => Promise<Claim | null>;
  fetchResourceData: (resourceId: string) => Promise<Resource | null>;
}

const BitCraftContext = createContext<BitCraftContextType | undefined>(undefined);

export const useBitCraft = () => {
  const context = useContext(BitCraftContext);
  if (context === undefined) {
    throw new Error('useBitCraft must be used within a BitCraftProvider');
  }
  return context;
};

export const BitCraftProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [worldMap, setWorldMap] = useState<WorldMap | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorldMap = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const worldMapData = await BitCraftAPI.getWorldMap();
      setWorldMap(worldMapData);
    } catch (error) {
      setError('Failed to fetch world map');
      console.error('Error fetching world map:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatMessages = async (channel: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Implement actual BitCraft API call
      // For now, simulate chat messages
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          sender: 'Player1',
          message: 'Hello everyone!',
          timestamp: new Date(),
          channel: 'global' as any,
        },
      ];

      setChatMessages(mockMessages);
    } catch (error) {
      setError('Failed to fetch chat messages');
      console.error('Error fetching chat messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async (
    message: string,
    channel: string,
  ): Promise<void> => {
    try {
      setError(null);
      
      // TODO: Implement actual BitCraft API call
      // For now, simulate sending a message
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message,
        timestamp: new Date(),
        channel: channel as any,
      };

      setChatMessages(prev => [...prev, newMessage]);
    } catch (error) {
      setError('Failed to send message');
      console.error('Error sending message:', error);
    }
  };

  const fetchClaimStatus = async (claimId: string): Promise<Claim | null> => {
    try {
      // TODO: Implement actual BitCraft API call
      // For now, return null
      return null;
    } catch (error) {
      console.error('Error fetching claim status:', error);
      return null;
    }
  };

  const fetchResourceData = async (resourceId: string): Promise<Resource | null> => {
    try {
      // TODO: Implement actual BitCraft API call
      // For now, return null
      return null;
    } catch (error) {
      console.error('Error fetching resource data:', error);
      return null;
    }
  };

  const value: BitCraftContextType = {
    worldMap,
    chatMessages,
    isLoading,
    error,
    fetchWorldMap,
    fetchChatMessages,
    sendChatMessage,
    fetchClaimStatus,
    fetchResourceData,
  };

  return (
    <BitCraftContext.Provider value={value}>{children}</BitCraftContext.Provider>
  );
}; 