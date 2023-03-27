const QUOTES = "quotes";

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
setInterval(getQuotes, 1000);

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
  const serachInput = document.querySelector(".searchInput");
  const serachResult = document.querySelector(".searchResult");

  if (!serachInput.value) return;
  if (isLoading) return;

  isLoading = true;

  const question = searchInput.value;
  serachInput.value = "검색 중 입니다... 잠시만  기다려주세요.";

  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question,
    },
    {
      Headers: {
        "Content-Type": "application/json",
        Authorization: "Baarer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    serachResult.style.display = "inline";
    serachResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  isLoading = false;
}
