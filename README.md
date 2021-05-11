# MiniProject03_AsaichiCheck

![Alt text](準備中)

[URL](https://準備中)

## **✨ 目標**

- API を活用とした様々な機能提供。
- Local Storage を利用し、保存機能
<p align="center"><img src="＃"/></p>

## **🧰 使用スキル**

- HTML, CSS, JAVSCRIPT(Fetch API, Geolocation API - 地域情報), Local Storage
- OpenWeatherMap API, erikflowers icon (天気情報)
- Unsplash API (壁イメージ))
- Quotable API (名言)

## **📅 開発人数/期間**

- １人/２日

## **👀 機能 & コード**

```
💡 目次

1. 最初のページでユーザの位置情報へのアクセス許可と時計の下段にユーザ名をかくところ
2. 画面の右上に天気情報（地域、気温、天気アイコン）
3. 位置情報
4. ページのロードにより名言更新機能
5. ページのロードにより背景画面は変わる機能
6. CheckList 機能
7. Google で検索機能
```

### **1. 最初のページでユーザの位置情報へのアクセス許可と時計の下段にユーザ名をかくところ**

<p align="center"><img src="＃"/></p>

### **💻 コード**

> 天気情報をもらうために javascript の Geolocation API を使用。

```js
function init() {
  const coords = localStorage.getItem(COORDS);
  if (coords === null) {
    loadCoords();
  } else {
    const coordsParse = JSON.parse(coords);
    getWeather(coordsParse);
    setInterval(() => getWeather(coordsParse), 60000);
  }
}

init();
```

> loadCoords()は navigator.geolocation を通って Geolocation API をロード
> succCoordsHandle ロードに失敗した場合は　 errLoacitonHandle を呼び出す。

```js
function loadCoords() {
  navigator.geolocation.getCurrentPosition(succCoordsHandle, errLoacitonHandle);
}
```

```js
function succCoordsHandle(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(coordsObj);
  saveCoords(coordsObj);
}
```

```js
const COORDS = "coords";

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
```

```js
function errLoacitonHandle() {
  console.log("cant access geo location");
}
```

### **💻 コード**　位置情報

> 最初のアクセスの場合は initName()を呼び出す。

```js
function loadText() {
  const loadedName = localStorage.getItem(NAME);
  if (loadedName === null) {
    initName();
    return;
  } else {
    createItem(loadedName, "greeting");
  }
}

function init() {
  loadText();
  textContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target;
    handleSubmit(target);
  });
  textContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.type === "edit") editItem(target);
  });
}

init();
```

```js
function initName() {
  greetInput.classList.remove("hide");
  greetBtn.classList.add("hide");
}
```

---

### **2. 画面の右上に天気情報（地域、気温、天気アイコン）**

<p align="center"><img src="＃"/></p>

### **💻 コード**　天気情報

```js
function succCoordsHandle(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(coordsObj);
  saveCoords(coordsObj);
}
```

```js
function getWeather(coords) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((json) => createWeather(json))
    .catch((error) => console.log("error", error));
}
```

```js
function createWeather(weather) {
  const textTemp = document.querySelector(".header__weather--temperature");
  const textLoaction = document.querySelector(".header__weather--location");
  const weatherIcon = document.querySelector(".header__weather--ico");
  const weatherContainer = document.querySelector(
    ".header__weather--container"
  );
  const temp = weather.main.temp;
  const name = weather.name;
  const status = weather.weather[0].id;
  const weatherTitle = weather.weather[0].description;
  const sunrise = weather.sys.sunrise;
  const sunset = weather.sys.sunset;
  const getTime = new Date().getTime();
  const str = getTime.toString();
  const substr = str.substring(0, 10);
  const number = Number(substr);
  textTemp.innerText = `${temp}°`;
  textLoaction.innerText = name;
  textLoaction.setAttribute("title", `${name}`);
  weatherIcon.setAttribute("title", `${weatherTitle}`);
  weatherContainer.setAttribute("title", `${temp}°`);
  if (number >= sunrise && number < sunset) {
    weatherIcon.classList.add(`wi-owm-day-${status}`);
  } else {
    weatherIcon.classList.add(`wi-owm-night-${status}`);
  }
}
```

```js
if (number >= sunrise && number < sunset) {
  weatherIcon.classList.add(`wi-owm-day-${status}`);
} else {
  weatherIcon.classList.add(`wi-owm-night-${status}`);
}
```

---

### **3. ユーザ名入力する場合、保存されたユーザ名の修正機能**

<p align="center"><img src="＃"/></p>

### **💻 コード**

```js
function init() {
  loadText();
  textContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target;
    handleSubmit(target);
  });
  textContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.type === "edit") editItem(target);
  });
}

init();
```

```js
function handleSubmit(target) {
  const input = target.querySelector("input[type=text]");
  const inputValue = input.value;
  if (inputValue === " ") {
    return;
  }
  saveItem(inputValue, target);
  createItem(inputValue, target);
}
```

```js
const greeting = document.querySelector("form[name='greeting']");
const NAME = "greeting";

function saveItem(text, target) {
  if (target === greeting || target === "greeting") {
    localStorage.setItem(NAME, text);
  }
}
```

```js
const greeting = document.querySelector("form[name='greeting']");

function createItem(inputValue, target) {
  const div = document.createElement("div");
  if (target === greeting || target === "greeting") {
    greetInput.classList.add("hide");
    greetBtn.classList.remove("hide");
    div.setAttribute("class", "container-top__greeting--name");
    div.innerText = `${inputValue}`;
    greetText.innerText = "Have A Nice Day !";
    greetText.appendChild(div);
  }
}
```

```js
function editItem(target) {
  const formContainer = target.parentNode;
  const formName = formContainer.getAttribute("name");
  const formText = document.querySelector(`.container-top__${formName}--name`);
  const selection = window.getSelection();
  formText.setAttribute("contenteditable", true);
  selection.selectAllChildren(formText);
  selection.collapseToEnd();
  formText.focus();
  formText.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      if (formText.innerText == "" || formText.innerText.trim("") == "") {
        loadText();
        return;
      }
      formText.setAttribute("contenteditable", false);
      saveItem(formText.innerText, formName);
    }
  });
  formText.addEventListener("blur", () => {
    if (formText.innerText == "" || formText.innerText.trim("") == "") {
      loadText();
      return;
    }
    formText.setAttribute("contenteditable", false);
    saveItem(formText.innerText, formName);
  });
}
```

---

### **4. 位置情報**

<p align="center"><img src="#"/></p>

### **💻 コード**

```js
const time = document.querySelector(".container-top--time");

function timeHandler() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  time.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  timeHandler();
  setInterval(timeHandler, 60000);
}

init();
```

---

### **5. ページのロードにより背景画面は変わる機能**

<p align="center"><img src="＃"/></p>

<p align="center"><img src="＃"/></p>

### **💻 コード**

> 壁イメージは Unsplash API を使用した。

```js
function loadImages() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.unsplash.com/search/photos/?query=nature&color=black&orientation=landscape&client_id=${IMAGE_KEY}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      const images = json.results;
      const index = Math.floor(Math.random() * images.length);
      const img = images[index];
      imageHandle(img);
      infoHandle(img);
    })
    .catch((err) => console.log("err", err));
}

function init() {
  loadImages();
}

init();
```

<p align="center">
<img src="＃"/></p>

```js
function infoHandle(info) {
  const description = document.querySelector(".container-bottom--location");
  const locationText = document.querySelector(".bg-location");
  const userText = document.querySelector(".bg-user");
  const link = info.links.html;
  const name = info.user.name;
  let location = info.user.location;
  if (location === null) {
    location = "Unsplash landscape";
  }
  description.setAttribute("href", `${link}`);
  locationText.innerText = `${location}`;
  userText.innerText = `by ${name}`;
}
```

```js
function imageHandle(img) {
  const body = document.querySelector("body");
  const url = img.urls.regular;
  body.style.backgroundImage = `url("${url}")`;
}
```

---

### **6. ページのロードにより名言更新機能**

<p align="center"><img src="＃"/></p>

### **💻 コード**

> Quotable API を利用し、名言をロードしている。
> データは loadQuote()から createQuote()へ。

```js
function createQuote(data) {
  const textQuote = document.querySelector(".container-bottom--quote");
  const testAuthor = document.querySelector(".container-bottom--author");
  const quote = data.content;
  const author = data.author;
  textQuote.innerText = `"${quote}"`;
  testAuthor.innerText = `- ${author}`;
}

function loadQuote() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("https://api.quotable.io/random?maxLength=60", requestOptions)
    .then((response) => response.json())
    .then((json) => createQuote(json))
    .catch((error) => console.log("error", error));
}

function init() {
  loadQuote();
}

init();
```

```js
function createQuote(data) {
  const textQuote = document.querySelector(".container-bottom--quote");
  const testAuthor = document.querySelector(".container-bottom--author");
  const quote = data.content;
  const author = data.author;
  textQuote.innerText = `"${quote}"`;
  testAuthor.innerText = `- ${author}`;
}
```

---

### **7. CheckList 機能**

<p align="center"><img src="＃"/></p>

### **💻 コード**

```js
const todoForm = document.querySelector(
  ".container-bottom--container__container--form"
);
const todosContainer = document.querySelector(
  ".container-bottom--container__container--list"
);
const noList = document.querySelector(".no-list");

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS);
  if (loadedToDos === null || loadedToDos.length <= 2) {
    noList.classList.remove("hide");
  } else {
    noList.classList.add("hide");
    const parsedTodos = JSON.parse(loadedToDos);
    parsedTodos.forEach((todo) => {
      saveList(todo.content, todo.checked);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
  todosContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.type === "edit") {
      editList(target);
    } else if (target.dataset.type === "delete") {
      deleteList(target);
    } else if (target.dataset.type === "checkbox") {
      checkList(target);
    }
  });
}

init();
```

<p align="center"><img src="＃"/></p>

```js
const todoInput = document.querySelector(
  ".container-bottom--container__container--input"
);

function handleSubmit(e) {
  e.preventDefault();
  noList.classList.add("hide");
  const content = todoInput.value;
  if (content === " ") {
    return;
  }
  saveList(content);
  todoInput.value = "";
}
```

```js
let todos = [];

function saveList(content, checked) {
  const li = document.createElement("li");
  li.setAttribute("class", "container-bottom--container__container--item");
  const index = todos.length + 1;
  const inputCheck = document.createElement("input");
  inputCheck.setAttribute("id", `item${index}`);
  inputCheck.setAttribute("type", "checkbox");
  const label = document.createElement("label");
  label.setAttribute("for", `item${index}`);
  label.setAttribute("data-type", "checkbox");
  label.setAttribute("data-id", `${index}`);
  const span = document.createElement("span");
  span.setAttribute("class", "container-bottom--container__container--content");
  span.innerHTML = content;
  const sronly = document.createElement("span");
  sronly.setAttribute("class", "sr-only");
  sronly.innerText = content;
  const div = document.createElement("div");
  div.setAttribute("class", "container-bottom--container__container--btns");
  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", "container-bottom--container__container--edit");
  editBtn.setAttribute("type", "button");
  editBtn.setAttribute("data-type", "edit");
  const delBtn = document.createElement("button");
  delBtn.setAttribute(
    "class",
    "container-bottom--container__container--delete"
  );
  delBtn.setAttribute("type", "button");
  delBtn.setAttribute("data-type", "delete");
  label.appendChild(sronly);
  div.appendChild(editBtn);
  div.appendChild(delBtn);
  li.setAttribute("data-id", `${index}`);
  li.appendChild(inputCheck);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(div);
  todosContainer.appendChild(li);
  const todo = {
    index,
    checked: checked >= 0 ? checked : 0,
    content,
  };
  todos.push(todo);
  if (checked === 1) {
    inputCheck.setAttribute("checked", checked);
    label.setAttribute("class", "checked");
  }
  saveStorage();
}
```

```js
const TODOS = "todos";

function saveStorage() {
  const todosString = JSON.stringify(todos);
  localStorage.setItem(TODOS, todosString);
}
```

<p align="center"><img src="＃"/></p>

```js
function editList(target) {
  const btnContainer = target.parentNode;
  const targetList = btnContainer.parentNode;
  const content = targetList.querySelector(
    " .container-bottom--container__container--content"
  );
  const selection = window.getSelection();
  content.setAttribute("contenteditable", true);
  selection.selectAllChildren(content);
  selection.collapseToEnd();
  content.focus();
  content.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      if (content.innerText == "" || content.innerText.trim("") == "") {
        content.innerText = todos[targetList.dataset.id - 1].content;
        return;
      }
      content.setAttribute("contenteditable", false);
      todos[targetList.dataset.id - 1].content = content.innerText;
      saveStorage();
    }
  });
  content.addEventListener("blur", () => {
    if (content.innerText == "" || content.innerText.trim("") == "") {
      content.innerText = todos[targetList.dataset.id - 1].content;
      return;
    }
    content.setAttribute("contenteditable", false);
    todos[targetList.dataset.id - 1].content = content.innerText;
    saveStorage();
  });
}
```

<p align="center"><img src="＃"/></p>

```js
function checkList(target) {
  if (!target.classList.contains("checked")) {
    target.classList.add("checked");
    todos[target.dataset.id - 1].checked = 1;
    saveStorage();
  } else {
    target.classList.remove("checked");
    todos[target.dataset.id - 1].checked = 0;
    saveStorage();
  }
}
```

<p align="center"><img src="＃"/></p>

```js
function deleteList(target) {
  const btnContainer = target.parentNode;
  const targetList = btnContainer.parentNode;
  todosContainer.removeChild(targetList);
  const deleteTodos = todos.filter((todo) => {
    return todo.index !== parseInt(targetList.dataset.id);
  });
  todos = deleteTodos;
  if (todos.length <= 0) {
    noList.classList.remove("hide");
  }
  saveStorage();
}
```

---

### **8. Google で検索機能**

<p align="center"><img src="＃"/></p>

### **💻 コード**

> Search バーに click イベントした場合 active class を追加しました。

```js
const inputToggle = document.querySelector(".header__toggle");
const inputFormContainer = document.querySelector(".header__form-container");
inputToggle.addEventListener("click", () => {
  inputFormContainer.classList.toggle("active");
});
```

---

## **👋 学んだこと**

> いつも毎日使っていた Momentum という Googlechrome の WEBAPP を実際にまねしながらつくることで色んな勉強になったこと。
> 様々な API を利用し機能を実際に作ってみることで、API の活用方法に学習したこと。
> ミニプロジェクトを通してこれから Javascript を使うプロジェクトにも少し自身ができました。
