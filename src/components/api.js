const config = { 
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-23', 
  headers: { 
    authorization: '6e7b862c-e036-4ad7-9192-22356f56d7f2', 
    'Content-Type': 'application/json', 
  }, 
}; 

// Универсальная функция для обработки запросов
const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

// Функция проверки ответа от сервера
const handleResponse = (res) => { 
  if (res.ok) { 
    return res.json(); 
  } 
  return Promise.reject(`Ошибка: ${res.status}`); 
};

// Получение карточек с сервера
export const getInitialCards = () => { 
  return request(`${config.baseUrl}/cards`, { 
    headers: config.headers, 
  }); 
}; 

// Получение информации о пользователе с сервера
export const getUserInfo = () => { 
  return request(`${config.baseUrl}/users/me`, { 
    headers: config.headers, 
  }); 
}; 

// Обновление информации о пользователе на сервере
export const updateUserProfile = (name, about) => { 
  return request(`${config.baseUrl}/users/me`, { 
    method: 'PATCH', 
    headers: config.headers, 
    body: JSON.stringify({ 
      name: name, 
      about: about, 
    }), 
  }); 
}; 

// Обновление аватара пользователя
export const updateAvatar = (avatarLink) => { 
  return request(`${config.baseUrl}/users/me/avatar`, { 
    method: 'PATCH', 
    headers: config.headers, 
    body: JSON.stringify({ 
      avatar: avatarLink 
    }) 
  }); 
}; 

// Функция добавления новой карточки
export const addNewCard = (name, link) => { 
  return request(`${config.baseUrl}/cards`, { 
    method: 'POST', 
    headers: config.headers, 
    body: JSON.stringify({ 
      name: name, 
      link: link 
    }) 
  }); 
}; 

// Функция добавления лайка на сервере
export const addLike = (cardId) => { 
  return request(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: config.headers, 
  }); 
}; 

// Функция удаления лайка с сервера
export const removeLike = (cardId) => { 
  return request(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers, 
  }); 
}; 

// Функция удаления карточки с сервера
export const deleteCardFromServer = (cardId) => { 
  return request(`${config.baseUrl}/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers 
  }); 
};
