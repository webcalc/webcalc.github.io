const cacheKey = "calculation_history"

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(cacheKey) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(cacheKey));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(cacheKey, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage) {
        return JSON.parse(localStorage.getItem(cacheKey)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    let historyList = document.querySelector("#historyList");
    historyList.innerHTML = "";
    const historyData = showHistory();

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

let addToClass = document.getElementById("clearHistory");
const clearButton = document.querySelector("#clearHistory");
if (localStorage.getItem !== undefined) {
    clearButton.addEventListener('click', function(event) {
        localStorage.removeItem(cacheKey);
        renderHistory();
    });
}

renderHistory();