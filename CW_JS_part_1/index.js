// знаходимо елементи DOM

const form = document.querySelector('form');
const userInput = document.getElementById('userInput');
const addBtn = document.getElementById('btnAdd');
const listPairs = document.getElementById('listPairs');
const sortNameBtn = document.getElementById('btnSortByName');
const sortValueBtn = document.getElementById('btnSortByValue');
const delBtn = document.getElementById('btnDel');

let pairs = [];

// валідація

function validatePair(str) {
    const regex = /^\s*([A-Za-z0-9]+)\s*=\s*([A-Za-z0-9]+)\s*$/;
    const match = str.match(regex);
    return match ? { name: match[1], value: match[2] } : null;
}

// вміст textarea (для виведення списку пар використовую textarea, так як  input - це рядкови елемент)
function updateList() {
    if (pairs.length === 0) {
        listPairs.value = '';
        return;
    }

    // кожна пара - новий рядок
    listPairs.value = pairs.map(p => `${p.name} = ${p.value}`).join('\n');
}

// додавання пари

function addPair() {
    const value = userInput.value.trim();

    if (value === '') {
        alert('Введіть пару!');
        return;
    }

    const validated = validatePair(value);

    if (validated) {
        pairs.push(validated);
        updateList();
        userInput.value = ''; // очищаємо поле
    } else {
        alert('Невірний формат!');
    }
}

// обробник кнопки "add"

addBtn.addEventListener('click', addPair);

// обробник submit форми (для Enter)

form.onsubmit = function(e) {
    e.preventDefault(); // запобігаємо перезавантаженню сторінки
    addPair();          // додаємо пару
};

// сортування за ключем

sortNameBtn.addEventListener('click', () => {
    pairs.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })); // розпізнає числа в середині рядків і сортує їх
    updateList();
});

// сортування за значенням

sortValueBtn.addEventListener('click', () => {
    pairs.sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true }));// розпізнає числа в середині рядків і сортує їх
    updateList();
});

// видалення

delBtn.addEventListener('click', () => {
    if (pairs.length === 0 || confirm('Видалити?')) {
        pairs = [];
        updateList();
    }
})