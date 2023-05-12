let timerEle = document.getElementById('timer');
let speedTypingTestEl = document.getElementById('speedTypingTest');
let displayQuotesEle = document.getElementById('displayQuotes');
let inputQuotesEle = document.getElementById('inputQuotes');
let resultEle = document.getElementById('result');
let submitBtnEle = document.getElementById('submitBtn');
let resetBtnEle = document.getElementById('resetBtn');
let spinnerEl = document.getElementById('spinner');
let count = 0;
let uniqueId;



function reset() {
  inputQuotesEle.value = "";
  resultEle.textContent = "";

  let options = {
    method: "GET"
  };
  
  fetch("https://api.quotable.io/random", options)
  .then(function(response){
      return response.json();
  })
  .then(function(data){
    displayQuotesEle.textContent = data.content;
    displayQuotesEle.classList.add('display-quotes');
    uniqueId = setInterval(function(){
      count=count+1;
      timerEle.textContent=count;
    },1000);
    console.log(uniqueId);
  })
}
reset();

function clearTimers(){
  clearInterval(uniqueId);
  timerEle.textContent = 0;
  count = 0;
}
  
function validate(){
  let quoteDisplayed = displayQuotesEle.textContent;
  let inputQuote = inputQuotesEle.value;
  if(quoteDisplayed===inputQuote){
    clearInterval(uniqueId);
    let time = timerEle.textContent;
    resultEle.textContent = "Test completed : You typed in " + time + " seconds";
    resultEle.style.color = "black";
  }
  else{
    resultEle.textContent = "Test failed : You typed incorrect";
    resultEle.style.color = "red";
  }
}

submitBtnEle.onclick = function(){
  validate();
};

resetBtnEle.onclick = function(){
  clearTimers();
  reset();
};