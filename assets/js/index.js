const div = document.getElementById("div");
const form = document.getElementById("form");
const btnEnd = document.getElementById("btn-end");
const btnAbout = document.getElementById("btn-about");
const imgFirst = document.getElementById("img-first");
const btnNext = document.getElementById("btn-next-image");
const btnStart = document.getElementById("btn-start");
const message =  document.getElementById("message");
const containerPointsDelete = document.getElementById("container-points-delete");
let points = document.getElementById("points");
let span = document.createElement("span");

const arrayImagesAnimals = [
    `<img src="/assets/img/img-animals/imagem-coelho.png" data-name="Coelho" data-name2="coelho" alt="Imagem Coelho">`,
    `<img src="/assets/img/img-animals/imagem-elefante.png" data-name="Elefante" data-name2="elefante" alt="Imagem Elefante">`,
    `<img src="/assets/img/img-animals/imagem-gato.png" data-name="Gato" data-name2="gato" alt="Imagem Gato">`,
    `<img src="/assets/img/img-animals/imagem-leao.png" data-name="Leao" data-name2="leao" alt="Imagem Leão">`,
    `<img src="/assets/img/img-animals/imagem-leopardo.png" data-name="Leopardo" data-name2="leopardo" alt="Imagem Leopardo">`,
    `<img src="/assets/img/img-animals/imagem-macaco.png" data-name="Macaco" data-name2="macaco" alt="Imagem Macaco">`,
    `<img src="/assets/img/img-animals/imagem-rinoceronte.png" data-name="Rinoceronte" data-name2="rinoceronte" alt="Imagem Rinoceronte">`,
    `<img src="/assets/img/img-animals/imagem-tartaruga.png" data-name="Tartaruga" data-name2="tartaruga" alt="Imagem Tartaruga">`,
    `<img src="/assets/img/img-animals/imagem-zebra.png" data-name="Zebra" data-name2="zebra" alt="Imagem Zebra">`
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

const getEmptyMessage = () => {
    message.innerHTML = "";
}

const addImageIntoDOM = () => {
    span.innerHTML = `${arrayImagesAnimals[getRandomNumber()]}`;
    div.append(span);

    const filhoSpan = span.querySelector("img");
    const getAtributeAnimal1 = filhoSpan.getAttribute("data-name");
    const getAtributeAnimal2 = filhoSpan.getAttribute("data-name2");

    checkAnimalNameSubmit(getAtributeAnimal1, getAtributeAnimal2);

    visibleFormBtn();
}

const nextImage = () => {
    getEmptyMessage();
    btnNext.style.display = "none";

    const filhoSpan = span.querySelector("img");
    filhoSpan.remove();

    span.innerHTML = `${arrayImagesAnimals[getRandomNumber()]}`;
    div.append(span);

    const imgSpan = span.querySelector("img");
    const getNameAtribute = imgSpan.getAttribute("data-name");
    const getNameAtribute2 = imgSpan.getAttribute("data-name2");

    checkAnimalNameSubmit(getNameAtribute, getNameAtribute2);
}

const checkAnimalNameSubmit = (dataName1, dataName2) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let input = document.getElementById("text").value;
        input = getRemoveAccentsName(input);

        const inputCondicao1 = input === dataName1;
        const inputCondicao2 = input === dataName2;

        if(input === ""){
            message.innerText = "Por favor, preencha o campo!";
        }else if(inputCondicao1 || inputCondicao2){
            message.innerHTML = `Parabéns, você acertou! o animal se chama ${input}!`;
            btnNext.style.display = "flex";
            document.getElementById("text").value = "";
            addPointsDOM();
        }else{
            message.innerHTML = "Nome errado! Por favor, tente novamente";
        }
    });
}

const addPointsDOM = () => {
    let contador = 1;
    
    let getPontoLocalStorage = localStorage.getItem("ponto");
    let getContLocalStorage = localStorage.getItem("contador");
    
    if(getPontoLocalStorage >= 1){
        points.innerHTML = `${++getPontoLocalStorage}`;
        contador += parseInt(getContLocalStorage);
        savePointsLocalStorage(contador);
    }else{
        points.innerHTML = `${contador}`;
        savePointsLocalStorage(contador);
        btnDeletee();
    }
}

const savePointsLocalStorage = (contador) => {
    localStorage.setItem("ponto", contador);
    localStorage.setItem("contador", contador);
}

const localStorageIntoDOM = () => {
    points.innerHTML = localStorage.ponto;
    
    if(points.innerHTML == "undefined"){
        points.innerHTML = 0;
    }
}
localStorageIntoDOM();

const btnDeletee = () => {
    const btnDelete = document.createElement("span");

    if(localStorage.ponto >= 1){
        btnDelete.innerHTML = `<button id="delete-points" class="delete-points show-btn" onClick="deletePoints()">Deletar pontos</button>`;
        containerPointsDelete.append(btnDelete);
    }else{
        btnDelete.remove();
    }
}
btnDeletee();

const deletePoints = () => {
    localStorage.ponto = 0;
    localStorage.contador = 0;
    points.innerHTML = 0;
    document.location.reload(true);
}