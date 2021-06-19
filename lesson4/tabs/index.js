/* 
    Задание 2:

    Доделать tabs с урока

    1. Переписать код tabs с урока по видео
    2. Внутри третьей вкладки добавить функционал табов. Количество вкладок: 2. Контент внутри - на ваш вкус 

*/

//Задание 2

const tabs = document.getElementById('tabs'),
    contents = document.querySelectorAll('.content'),
    tabsInner = document.getElementById('tabs-inner'),
    contentsInner = document.querySelectorAll('.content-inner');

//Удаляем у всех табов класс "active" и устанавливаем у активного
const changeClass = (el, item) => {

    for (let i = 0; i < item.children.length; i++) {
        item.children[i].classList.remove('active');
    }
    el.classList.add('active');
}

//Удаляем у всех контент-блоков класс "active" и устанавливаем у активного
const showContent = (el, item) => {
    for (let i = 0; i < el.length; i++) {
        el[i].classList.remove('active');

        if (el[i].dataset.content === item) {
            el[i].classList.add('active');
        }
    }
}

tabs.addEventListener('click', (e) => {
    const currentTab = e.target.dataset.btn;
    changeClass(e.target, tabs);
    showContent(contents, currentTab);

});

tabsInner.addEventListener('click', (e) => {
    const currentTab = e.target.dataset.btn;
    changeClass(e.target, tabsInner);
    showContent(contentsInner, currentTab);
});