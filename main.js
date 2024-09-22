(()=>{"use strict";var e,t={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"6e7b862c-e036-4ad7-9192-22356f56d7f2","Content-Type":"application/json"}},n=function(e,t){return fetch(e,t).then(o)},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},r=function(e){return n("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers})},c=function(e){return n("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers})};function a(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",u),e.addEventListener("mousedown",l),setTimeout((function(){e.classList.add("popup_visible")}),10)}function i(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keydown",u),e.removeEventListener("mousedown",l)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}}function l(e){e.target===e.currentTarget&&i(e.target)}function s(e,t,n,o){var r=e.querySelector(".popup__input-error_type_".concat(t.name));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}function d(e,t,n){var o=e.querySelector(".popup__input-error_type_".concat(t.name));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function p(e,t,n){t?(e.classList.add("popup__button_disabled"),e.classList.remove("popup__button_invalid")):n?(e.classList.remove("popup__button_disabled"),e.classList.remove("popup__button_invalid")):(e.classList.add("popup__button_invalid"),e.classList.remove("popup__button_disabled"))}function f(e,t,n){var o=Array.from(e.querySelectorAll(n.inputSelector)),r=o.every((function(e){return e.validity.valid})),c=o.every((function(e){return""===e.value.trim()}));t.disabled=!r,p(t,c,r)}function m(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){d(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);n.disabled=!0,p(n,!0,!1)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var v=document.querySelector(".content").querySelector(".places__list"),y=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_avatar-edit"),S=document.querySelector(".popup_type_image"),L=document.querySelector(".popup_type_confirm-delete"),C=S.querySelector(".popup__image"),k=S.querySelector(".popup__caption"),E=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),g=document.querySelector(".profile__avatar-edit-button"),x=document.querySelectorAll(".popup__close"),w=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),T=document.forms["edit-profile"],D=T.elements.name,I=T.elements.description,O=document.forms["new-place"],P=O.elements["place-name"],j=O.elements.link,B=document.forms["edit-avatar"],N=B.elements["avatar-link"],J=null,M=L.querySelector(".popup__button"),V=document.querySelector(".scroll-to-top"),z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",invalidButtonClass:"popup__button_invalid",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function H(t){var n=function(e,t){var n=t.handleCardClick,o=t.currentUserId,a=t.openConfirmDeletePopup,i=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),u=i.querySelector(".card__delete-button"),l=i.querySelector(".card__image"),s=i.querySelector(".card__like-button"),d=i.querySelector(".card__like-count");return i.querySelector(".card__title").textContent=e.name,l.src=e.link,l.alt=e.name,d.textContent=e.likes.length,e.owner&&e.owner._id===o?(u.style.display="block",u.addEventListener("click",(function(){a(i,e._id)}))):u.style.display="none",l.addEventListener("click",(function(){n(e.name,e.link)})),e.likes.some((function(e){return e._id===o}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(t){var n=s.classList.contains("card__like-button_is-active");!function(e,t,n,o){var a=e.target;o?c(t).then((function(e){a.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length,o=!1})).catch((function(e){console.error("Ошибка при снятии лайка: ".concat(e))})):r(t).then((function(e){a.classList.add("card__like-button_is-active"),n.textContent=e.likes.length,o=!0})).catch((function(e){console.error("Ошибка при постановке лайка: ".concat(e))}))}(t,e._id,d,n)})),i}(t,{handleCardClick:$,currentUserId:e,openConfirmDeletePopup:Y});v.prepend(n)}function $(e,t){C.src=t,C.alt=e,k.textContent=e,a(S)}function Y(e,t){J={cardElement:e,cardId:t},a(L)}function Z(){window.scrollTo({top:0,behavior:"smooth"})}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){var o=/^[a-zA-Zа-яА-ЯёЁ\s-]+$/;""===t.value.trim()?s(e,t,"Заполните это поле.",n):("place-name"!==t.name||o.test(t.value))&&("name"!==t.name&&"description"!==t.name||o.test(t.value))?t.validity.valid?d(e,t,n):s(e,t,t.validationMessage,n):s(e,t,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",n)}(e,n,t),f(e,o,t)}))}))}(t,e)}))}(z),Promise.all([n("".concat(t.baseUrl,"/users/me"),{headers:t.headers}),n("".concat(t.baseUrl,"/cards"),{headers:t.headers})]).then((function(t){var n,o,r=(o=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];w.textContent=c.name,A.textContent=c.about,U.style.backgroundImage="url(".concat(c.avatar,")"),e=c._id,a.reverse().forEach(H)})).catch((function(e){console.error("Ошибка при загрузке данных: ".concat(e))})),E.addEventListener("click",(function(){D.value=w.textContent,I.value=A.textContent,m(T,z);var e=T.querySelector(z.submitButtonSelector);f(T,e,z),a(y)})),q.addEventListener("click",(function(){O.reset(),m(O,z),a(b)})),g.addEventListener("click",(function(){B.reset(),m(B,z),a(h)})),T.addEventListener("submit",(function(e){e.preventDefault();var o,r,c=e.submitter;c.textContent="Сохранение...",T.checkValidity()&&(o=D.value,r=I.value,n("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:o,about:r})})).then((function(e){w.textContent=e.name,A.textContent=e.about,i(y)})).catch((function(e){console.error("Ошибка при обновлении профиля: ".concat(e))})).finally((function(){c.textContent="Сохранить"}))})),O.addEventListener("submit",(function(e){e.preventDefault();var o,r,c=e.submitter;c.textContent="Сохранение...",O.checkValidity()&&(o=P.value,r=j.value,n("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:o,link:r})})).then((function(e){H(e),i(b)})).catch((function(e){console.error("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){c.textContent="Сохранить"}))})),B.addEventListener("submit",(function(e){e.preventDefault();var o,r=e.submitter;r.textContent="Сохранение...",B.checkValidity()&&(o=N.value,n("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:o})})).then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")"),i(h)})).catch((function(e){console.error("Ошибка при обновлении аватара: ".concat(e))})).finally((function(){r.textContent="Сохранить"}))})),x.forEach((function(e){e.addEventListener("click",(function(e){i(e.target.closest(".popup"))}))})),L.addEventListener("submit",(function(e){var o;e.preventDefault(),J&&(M.textContent="Удаление...",(o=J.cardId,n("".concat(t.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:t.headers})).then((function(){J.cardElement.remove(),J=null,i(L)})).catch((function(e){console.error("Ошибка при удалении карточки: ".concat(e))})).finally((function(){M.textContent="Да"})))})),window.addEventListener("scroll",(function(){window.scrollY>300?V.classList.add("visible"):V.classList.remove("visible")})),document.addEventListener("DOMContentLoaded",(function(){V.addEventListener("click",Z)}))})();