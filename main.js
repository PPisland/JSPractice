const QUOTES = "quotes";

const API_KEY = "cb32e522ca563fad8516248b377b04d9";

function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let saveQuotes = localStorage.getItem(QUOTES);

  if (!saveQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "열심히 살아봅시다",
        "그래도 열심히 살아야지",
        "열심히 살면 뭐 해",
        "열심히 살면 반드시 빛이 온다.",
      ])
    );

    saveQuotes = localStorage.getItem(QUOTES);
  }
  let quotesArray = JSON.parse(saveQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();
setInterval(getQuotes, 2000);

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "inline-block";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) return;

  let saveQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(saveQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color:red;">${newQuotesInput.value}</span>`;
  newQuotes.style.display = "none";
  newQuotesInput.value = "";
}

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");

  if (!searchInput.value) return;

  const question = searchInput.value;

  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요.";

  // 프론트엔드에서 백엔드
  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  console.log(response);
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");
  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }
}

const weatherIcon = document.querySelector(".weatherIcon");
const weatherTemp = document.querySelector(".cityTemp");

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherTemp.innerText = data.name + ", " + parseInt(data.main.temp) + "℃";
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    });
});
