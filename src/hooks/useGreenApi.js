import { useState, useCallback, useRef, useEffect } from 'react';
import { sendMessage, receiveNotification, deleteNotification } from '../utils/api';

export function useGreenApi() {
  const [messages, setMessages] = useState([]);
  const [isPolling, setIsPolling] = useState(false);
  const pollingRef = useRef(null);
  const send = useCallback(async ({ idInstance, apiTokenInstance, chatId, text }) => {
  const data = await sendMessage({ idInstance, apiTokenInstance, chatId, message: text });

    if (data.idMessage) {
      setMessages((prev) => [
        ...prev,
        { id: data.idMessage, text, type: 'outgoing', timestamp: Date.now() },
      ]);
    }

    return data;
  }, []);

  const pollOnce = useCallback(async ({ idInstance, apiTokenInstance }) => {
    try {
      const notification = await receiveNotification({ idInstance, apiTokenInstance });
      if (!notification) return;

      const { body } = notification;

      if (
        body?.typeWebhook === 'incomingMessageReceived' &&
        body.messageData?.typeMessage === 'textMessage'
      ) {
        const text = body.messageData.textMessageData.textMessage;
        setMessages((prev) => [
          ...prev,
          { id: body.idMessage, text, type: 'incoming', timestamp: Date.now() },
        ]);
      }

      await deleteNotification({
        idInstance,
        apiTokenInstance,
        receiptId: notification.receiptId,
      });
    } catch (error) {
      console.error('Ошибка в цикле получения:', error);
    }
  }, []);

  const startPolling = useCallback(
    ({ idInstance, apiTokenInstance }) => {
      if (pollingRef.current) return;
      setIsPolling(true);
      pollingRef.current = setInterval(() => {
        pollOnce({ idInstance, apiTokenInstance });
      }, 3000);
    },
    [pollOnce]
  );

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setIsPolling(false);
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  return { messages, send, startPolling, stopPolling, isPolling };
}