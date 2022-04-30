const changeBackgroundImages = document.getElementById("change-background-images");
const imgFirst = document.getElementById("first-image");
const message = document.getElementById("result-message");
const containerPointsDelete = document.getElementById("container-points-delete");
let points = document.getElementById("points");
const form = document.getElementById("form");
const btnEnd = document.getElementById("btn-end");
const btnAbout = document.getElementById("btn-about");
const btnNext = document.getElementById("btn-next-image");
const btnStart = document.getElementById("btn-start");

let span = document.createElement("span");
const btnDelete = document.createElement("span");

const VectorWithImagesOfAnimals = [
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

const getNamesWithAccentsRemoved = (input) => {
    const input2 = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return input2;
}

const getRandomNumber = () => {
    const num = Math.floor(Math.random() * VectorWithImagesOfAnimals.length);
    return num;
}

const getEmptyMessage = () => {
    message.innerHTML = "";
}

const AddImageInDOM = () => {
    span.innerHTML = `${VectorWithImagesOfAnimals[getRandomNumber()]}`;
    changeBackgroundImages.append(span);

    const filhoSpan = span.querySelector("img");

    const GetAttributeOfAnimalOne = filhoSpan.getAttribute("data-name");
    const GetAttributeOfAnimalTwo = filhoSpan.getAttribute("data-name2");

    CheckTheAnimalsName(GetAttributeOfAnimalOne, GetAttributeOfAnimalTwo);

    visibleFormBtn();
}

const nextImage = () => {
    let input = document.getElementById("text").value = "";
    getEmptyMessage();
    btnNext.style.display = "none";
    form.style.display = "flex";

    const filhoSpan = span.querySelector("img");
    filhoSpan.remove();

    span.innerHTML = `${VectorWithImagesOfAnimals[getRandomNumber()]}`;
    changeBackgroundImages.append(span);

    const imgSpan = span.querySelector("img");

    const GetAttributeOfAnimalOne = imgSpan.getAttribute("data-name");
    const GetAttributeOfAnimalTwo = imgSpan.getAttribute("data-name2");

    CheckTheAnimalsName(GetAttributeOfAnimalOne, GetAttributeOfAnimalTwo);
}

const CheckTheAnimalsName = (dataName1, dataName2) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); //Não deixar o navegador recarregar quando der o submit;

        let input = document.getElementById("text").value;
        input = getNamesWithAccentsRemoved(input); //removendo os acentos dos texto;

        const inputCondicao1 = input === dataName1;
        const inputCondicao2 = input === dataName2;

        if (input === "") {
            message.textContent = "Por favor, preencha o campo!";
        } else if (input.indexOf(" ") > -1) {
            message.textContent = "Por favor, retire o espaço no campo para continuar";
        } else if (inputCondicao1 || inputCondicao2) {
            message.textContent = `Parabéns, você acertou! o animal se chama ${input}!`;
            btnNext.style.display = "flex";
            form.style.display = "none";
            addPointsDOM();
            // document.getElementById("text").value = "";
        } else {
            message.textContent = "Nome errado! Por favor, tente novamente";
        }
    });
}

const addPointsDOM = () => {
    let contador = 1;

    let getPontoLocalStorage = localStorage.getItem("ponto");
    let getContLocalStorage = localStorage.getItem("contador");

    if (getPontoLocalStorage >= 1) {
        points.innerHTML = `${++getPontoLocalStorage}`;
        contador += parseInt(getContLocalStorage);
        savePointsLocalStorage(contador);
    } else {
        points.innerHTML = `${contador}`;
        savePointsLocalStorage(contador);
        btnDeletee();
    }
}

const localStorageIntoDOM = () => {
    points.innerHTML = localStorage.ponto;

    if (points.innerHTML == "undefined") {
        points.innerHTML = 0;
    }
}
localStorageIntoDOM();

const savePointsLocalStorage = (contador) => {
    localStorage.setItem("ponto", contador);
    localStorage.setItem("contador", contador);
}

const btnDeletee = () => {

    if (localStorage.ponto >= 1) {
        btnDelete.innerHTML = `<button id="btn-delete-points" class="btn-delete-points" onClick="deletePoints()">Deletar pontos</button>`;
        containerPointsDelete.append(btnDelete);
    }
}
btnDeletee();

const deletePoints = () => {
    localStorage.clear();
    points.textContent = 0;
    btnDelete.remove();
}

const endGame = () => {
    document.location.reload(true);
}