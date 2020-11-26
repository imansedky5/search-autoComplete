const searchInput = document.getElementById('search-input');
const container = document.getElementById('container');

const fetchCites = (userInput, callBack1) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const parsedResponse = JSON.parse(xhr.responseText);
        callBack1(parsedResponse, userInput);
      }
    }
  };
  xhr.open('GET', '/cities', true);
  xhr.send();
};
const handelReponse = (callBack2, parsedResponse, userInput) => {
  const letter = userInput.slice(0, 2).toUpperCase();
  const autoCompleteChoices = parsedResponse
    .map((el) => el.toUpperCase())
    .filter((el) => el.startsWith(letter))
    .slice(0, 20);
  callBack2(autoCompleteChoices);
};

const renderCites = (autoCompleteChoices) => {
  autoCompleteChoices.forEach((el) => {
    const choiceContainer = document.createElement('div');
    choiceContainer.innerText = `${el}`;
    container.appendChild(choiceContainer);
  });
};

searchInput.addEventListener('input', (e) => {
  const inputValue = e.target.value;
  fetchCites(inputValue, () => handelReponse(renderCites));
});
