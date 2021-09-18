const div = document.getElementById("div");
const form = document.getElementById("form");
const btnEnd = document.getElementById("btn-end");
const btnAbout = document.getElementById("btn-about");
const imgFirst = document.getElementById("img-first");
const btnNext = document.getElementById("btn-next-image");
const btnStart = document.getElementById("btn-start");
const message =  document.getElementById("message");
let points = document.getElementById("points");

const arrayImagesAnimals = [
    { id: 0, image: `<img src="/assets/img/image-elefante.png" data-name="Elefante" data-name2="elefante">` },
    { id: 1, image: `<img src="/assets/img/image-gato.png" data-name="Gato" data-name2="gato">` },
    { id: 2, image: `<img src="/assets/img/image-leao.png" data-name="Leao" data-name2="leao">` }
];

const invisibleBtnForm = () => {
    form.style.display = "none";
    btnEnd.style.display = "none"; 
    btnNext.style.display = "none";
}
invisibleBtnForm();

const visibleFormBtn = () => {
    form.style.display = "flex";
    btnEnd.style.display = "flex";
    btnAbout.style.display = "none";
    btnNext.style.display = "flex";
    btnStart.style.display = "none";
    imgFirst.style.display = "none";
}

const getRemoveAccentsName = (input) => {
    const input2 = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return input2;
}

const getRandomNumber = () => {
    const num = Math.floor(Math.random() * arrayImagesAnimals.length);
    return num;
}

const addImageIntoDOM = () => {
    const span = document.createElement("span");
    span.innerHTML = `${arrayImagesAnimals[getRandomNumber()].image}`;
    div.append(span);

    const filhoSpan = span.querySelector("img");
    const getAtributeAnimal1 = filhoSpan.getAttribute("data-name");
    const getAtributeAnimal2 = filhoSpan.getAttribute("data-name2");

    checkAnimalNameSubmit(getAtributeAnimal1, getAtributeAnimal2);

    visibleFormBtn();
}

const checkAnimalNameSubmit = (dataName1, dataName2) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const input = document.getElementById("text").value;
        const input2 = getRemoveAccentsName(input);
        const inputCondicao1 = input2 === dataName1;
        const inputCondicao2 = input2 === dataName2;

        if(inputCondicao1 || inputCondicao2){
            message.innerHTML = `Parabéns, você acertou! o animal se chama ${input}!`;
            addPointsDOM();
        }else{
            alert("Nome errado! Por favor, tente novamente");
        }
    });
}

const addPointsDOM = () => {
    let contador = 1;

    let getPontoLocalStorage = localStorage.getItem("ponto");
    let getContLocalStorage = localStorage.getItem("contador");

    if(getPontoLocalStorage >= 1){
        points.innerHTML = `${++getPontoLocalStorage}`;
        contador = contador + parseInt(getContLocalStorage);
        savePointsLocalStorage(contador);
    }else{
        points.innerHTML = `${contador}`;
        savePointsLocalStorage(contador);
    }
}

const savePointsLocalStorage = (contador) => {
    localStorage.setItem("ponto", contador);
    localStorage.setItem("contador", contador);
}

points.innerHTML = localStorage.ponto;