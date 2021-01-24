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

const getResource = async (url) => {
  //fetch
  let res = await fetch(url);

  //get an error if it is
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }

  return await res.json();
};



export {postData, getResource};