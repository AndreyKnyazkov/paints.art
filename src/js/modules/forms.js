//import checkNumInputs from './checkNumInputs';

//import { isConcatSpreadable } from "core-js/fn/symbol";

import {postData} from '../services/requests';

const forms = () => {
  //получаем элементы которые нам понадобятся 
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        //the variable for display the textname of uploaded file
        upload = document.querySelectorAll('[name=upload]');

  //checkNumInputs('input[name="user_phone"]');

  //создаем объект с сообщеняими
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    faliure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  //we have two different paths so we have to create two paths
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  //ФУНКЦИЯ ОТВЕЧАЕТ ЗА ОТПРАВКУ ЗАПРОСАв
  //async чтобы данные с формы правильно отправлялись
  const postData = async (url, data) => {
    //fetch
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    //обрабатываем промис
    return await res.text();
  };

  //функция очищает все формы
  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  //We have a few variables with uplaod
  upload.forEach( item => {
    //check the variable with uploaded content
    item.addEventListener('input', () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split('.');
      arr[0].length > 5 ? dots = "..." : dots = ".";
      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });

  //ПЕРЕБИРАЕМ ВСЕ ФОРМЫ
  form.forEach(item => {
    //навешиваем обрабочик события
    item.addEventListener('submit', (e) => {
      //Чтобы страница не перезагружалась
      e.preventDefault();
      //создаем переменную и присваиваем ей класс
      //тут выводим сообщения
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      //add the elem to item parent
      item.parentNode.appendChild(statusMessage);
      //animate element
      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        //hide after animate
        item.style.display = 'none';
      }, 400);

      //create loading img with animation
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      //it doesn't work here
      //statusMessage.appendChild(statusImg);

      
      //create text with a message
      let textMessage = document.createElement('div');
      //text content from the Loading variable
      textMessage.textContent = message.loading;
      //set this
      statusMessage.appendChild(textMessage);

      //собираем все данные из введенной формы
      const formData = new FormData(item);
      //api for generate a dynamic path to send
      let api;
      //closest find the block with the selector higher in the hierarchy
      item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
      console.log(api);

      //отправляем запрос на сервер по этому адресу
      postData(api, formData)
        //возвращаем результат промисом
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
          statusImg.setAttribute('src', message.ok);
          //but it works here
          statusMessage.appendChild(statusImg);
        })
        //если ошибка
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          statusMessage.textContent = message.faliure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};

export default forms;