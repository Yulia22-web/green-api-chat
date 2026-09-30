const API_URL = 'https://api.green-api.com';

export async function sendMessage({ idInstance, apiTokenInstance, chatId, message }) {
  const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки: ${response.status}`);
  }

  return response.json();
}

export async function receiveNotification({ idInstance, apiTokenInstance }) {
  const url = `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка получения: ${response.status}`);
  }
  return response.json();
}

export async function deleteNotification({ idInstance, apiTokenInstance, receiptId }) {
  const url = `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
  const response = await fetch(url, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error(`Ошибка удаления: ${response.status}`);
  }

  return response.json();
}