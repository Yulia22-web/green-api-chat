import { useState } from 'react';
import logo from '../assets/logo.png'; 

export default function AuthForm({ onSubmit }) {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idInstance || !apiTokenInstance || !phone) {
      alert('Заполни все поля');
      return;
    }
    const chatId = `${phone.replace(/\D/g, '')}@c.us`;
    onSubmit({ idInstance, apiTokenInstance, chatId });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__header">
        <img
          className="auth-form__logo"
          src={logo}
          alt="Логотип MAX"
          width="52"
          height="52"
        />
        <h2 className="auth-form__title">Вход в MAX</h2>
        <p className="auth-form__hint">
          Введите данные вашего инстанса GREEN-API
        </p>
      </div>
      <label className="auth-form__label">
        <span>idInstance</span>
        <input
          type="text"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="1101000000"
          autoComplete="off"
        />
      </label>

      <label className="auth-form__label">
        <span>apiTokenInstance</span>
        <input
          type="text"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          placeholder="abcdef1234567890"
          autoComplete="off"
        />
      </label>

      <label className="auth-form__label">
        <span>Номер телефона получателя</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="79999999999"
        />
      </label>

      <button type="submit" className="auth-form__submit">
        Начать чат
      </button>
    </form>
  );
}