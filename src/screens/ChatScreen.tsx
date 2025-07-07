import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useBitCraft} from '../context/BitCraftContext';

const ChatScreen: React.FC = () => {
  const {chatMessages, fetchChatMessages, sendChatMessage} = useBitCraft();
  const [message, setMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('global');

  useEffect(() => {
    fetchChatMessages(selectedChannel);
  }, [selectedChannel, fetchChatMessages]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      await sendChatMessage(message.trim(), selectedChannel);
      setMessage('');
    }
  };

  const renderMessage = ({item}: {item: any}) => (
    <View style={styles.messageContainer}>
      <View style={styles.messageHeader}>
        <Text style={styles.senderName}>{item.sender}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  const ChannelButton: React.FC<{
    channel: string;
    label: string;
    isSelected: boolean;
    onPress: () => void;
  }> = ({channel, label, isSelected, onPress}) => (
    <TouchableOpacity
      style={[styles.channelButton, isSelected && styles.channelButtonSelected]}
      onPress={onPress}>
      <Text
        style={[
          styles.channelButtonText,
          isSelected && styles.channelButtonTextSelected,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.channelSelector}>
          <ChannelButton
            channel="global"
            label="Global"
            isSelected={selectedChannel === 'global'}
            onPress={() => setSelectedChannel('global')}
          />
          <ChannelButton
            channel="empire"
            label="Empire"
            isSelected={selectedChannel === 'empire'}
            onPress={() => setSelectedChannel('empire')}
          />
          <ChannelButton
            channel="claim"
            label="Claim"
            isSelected={selectedChannel === 'claim'}
            onPress={() => setSelectedChannel('claim')}
          />
        </View>
      </View>

      <FlatList
        style={styles.messagesList}
        data={chatMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder={`Message in ${selectedChannel} chat...`}
          placeholderTextColor="#94a3b8"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!message.trim()}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  channelSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  channelButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  channelButtonSelected: {
    backgroundColor: '#0ea5e9',
  },
  channelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  channelButtonTextSelected: {
    color: '#ffffff',
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  timestamp: {
    fontSize: 12,
    color: '#94a3b8',
  },
  messageText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ChatScreen; 