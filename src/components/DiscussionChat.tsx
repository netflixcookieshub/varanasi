import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, ChatMessage, Profile } from '../lib/supabase';
import { Send, Trash2 } from 'lucide-react';

export default function DiscussionChat() {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<(ChatMessage & { author: Profile })[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadMessages();

    const subscription = supabase
      .channel('chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        loadMessages();
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'chat_messages' }, () => {
        loadMessages();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*, author:profiles(*)')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !messageText.trim()) return;

    const content = messageText;
    setMessageText('');

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          author_id: user.id,
          content
        });

      if (error) throw error;
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessageText(content);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await supabase
        .from('chat_messages')
        .delete()
        .eq('id', messageId);
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading chat...</div>;
  }

  return (
    <div className="flex flex-col h-[600px] bg-slate-700/30 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {message.author.display_name?.[0] || message.author.username[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-white text-sm">{message.author.display_name || message.author.username}</span>
                    <span className="text-gray-500 text-xs">@{message.author.username}</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{message.content}</p>
                </div>
                {user?.id === message.author_id && (
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={sendMessage} className="border-t border-gray-700 p-4 flex gap-3">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Share your thoughts about Rudhra..."
          className="flex-1 px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          disabled={!messageText.trim()}
          className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
