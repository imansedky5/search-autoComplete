const searchInput = document.getElementById('search-input');
const container = document.getElementById('container');

const fetchCites = (callBack) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callBack(JSON.parse(xhr.responseText));
      }
    }
  };
  xhr.open('GET', '/cities', true);
  xhr.send();
};
const handelReponse = (parsedResponse, userInput) => {
  const letter = userInput.slice(0, 1).toUpperCase();
  const autoCompleteChoices = parsedResponse
    .map((el) => el.toUpperCase())
    .filter((el) => el.startsWith(letter))
    .slice(0, 20);
  return autoCompleteChoices;
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
  if (inputValue) {
    fetchCites((data) => renderCites(handelReponse(data, inputValue)));
    [...container.querySelectorAll('*')].forEach((el) => el.remove());
  } else {
    [...container.querySelectorAll('*')].forEach((el) => el.remove());
  }
});
