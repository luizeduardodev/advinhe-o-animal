const message = document.getElementById("result-message-p");
const form = document.getElementById("form");
const btnEnd = document.getElementById("btn-end");
let points = document.getElementById("score");
let cont = 0;

const span = document.createElement("span");
const btnDelete = document.createElement("span");
const spanMessagePonto = document.createElement("span");
const btnStart = document.createElement("button");
const btnNext = document.createElement("button");

const VectorWithImagesOfAnimals = [
    `<img src="/assets/img/img-animals/imagem-coelho.png" data-name="coelho" alt="Imagem Coelho">`,
    `<img src="/assets/img/img-animals/imagem-elefante.png" data-name="elefante" alt="Imagem Elefante">`,
    `<img src="/assets/img/img-animals/imagem-gato.png" data-name="gato" alt="Imagem Gato">`,
    `<img src="/assets/img/img-animals/imagem-leao.png" data-name="leao" alt="Imagem Leão">`,
    `<img src="/assets/img/img-animals/imagem-leopardo.png" data-name="leopardo" alt="Imagem Leopardo">`,
    `<img src="/assets/img/img-animals/imagem-macaco.png" data-name="macaco" alt="Imagem Macaco">`,
    `<img src="/assets/img/img-animals/imagem-rinoceronte.png" data-name="rinoceronte" alt="Imagem Rinoceronte">`,
    `<img src="/assets/img/img-animals/imagem-tartaruga.png" data-name="tartaruga" alt="Imagem Tartaruga">`,
    `<img src="/assets/img/img-animals/imagem-zebra.png" data-name="zebra" alt="Imagem Zebra">`
];

const invisibleBtnForm = () => {
    btnEnd.style.display = "none";
    form.style.display = "none";
};
invisibleBtnForm();

const visibleFormBtn = () => {
    const btnAbout = document.getElementById("btn-about");

    form.style.display = "flex";
    btnEnd.style.display = "flex";
    btnAbout.style.display = "none";
};

const getNamesWithAccentsRemoved = (input) => {
    const input2 = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return input2;
};

const getRandomNumber = () => {
    const num = Math.floor(Math.random() * VectorWithImagesOfAnimals.length);
    return num;
};

const addButtonHtml = (texto, id, classe, btn, btnBefore, funBtn) => {
    const containerBtn = document.getElementById("container-btn");
    let textBtns = document.createTextNode(texto); //Criando os textos de forma dinamica dos buttons;

    cont++;

    if (cont > 2) {
        textBtns = "";
    }

    btn.append(textBtns); //Colocando o texto no button;
    btn.setAttribute("id", id); //Adicionando o id;
    btn.classList = classe; //Adicionando a classe;

    containerBtn.insertBefore(btn, btnBefore); //Inserindo o btn antes de outro btn;

    btn.addEventListener("click", funBtn); //Adicionando o evento de click passando a função;
};

const removeButtonHtml = (btn) => {
    btn.remove();
};

const AddImageInDOM = () => {
    const mainImage = document.getElementById("main-image");

    mainImage.remove(); //Remove a imagem principal;

    //Chama a função que adiciona uma imagem;
    addImgInSpan();
    visibleFormBtn();

    if (form.style.display == "flex") {
        removeButtonHtml(btnStart);
    }
};

addButtonHtml("Iniciar o jogo", "btn-start", "btn", btnStart, btnEnd, AddImageInDOM); //Colocando o btn start no html;

//Adiciona uma imagem aleatória na tela;
const addImgInSpan = () => {
    const changeBackgroundImages = document.getElementById("change-background-image");

    span.innerHTML = `${VectorWithImagesOfAnimals[getRandomNumber()]}`; //Adicionando a imagem pegada aleatória no span criado;

    changeBackgroundImages.appendChild(span); //Adicionando a imagem no html;

    const filhoSpan = span.firstChild; //Pegando o elemento dentro do span, ou seja a imagem;

    console.log(filhoSpan);

    const GetAttributeOfAnimal = filhoSpan.getAttribute("data-name"); //Pegando os atributos data-name da imagem;

    console.log(GetAttributeOfAnimal);

    CheckTheAnimalsName(GetAttributeOfAnimal); //Chamando a função que verifica os nomes;
};

const CheckTheAnimalsName = (dataName) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let input = document.getElementById("text").value;
    
        input = getNamesWithAccentsRemoved(input); //Removendo acento;
        input = input.trim(); //Removendo espaço;
        input = input.toLowerCase(); //Deixando em minusculo;
        // const inputCondicao = input === dataName;
    
        if (input === "") {
            message.textContent = "Por favor, preencha o campo!";
        } else if (input === dataName) {
            message.textContent = `Parabéns, você acertou! o animal se chama ${input}!`;
            addButtonHtml("Próxima imagem", "btn-next-image", "btn", btnNext, btnEnd, nextImage);
            addPointsDOM();
            form.style.display = "none";
    
            //Adiciona uma mensagem informando que o ponto foi adicionado;
            const containerMessage = document.querySelector("#result-message");
            spanMessagePonto.textContent = `Seu ponto foi adicionado`;
            containerMessage.appendChild(spanMessagePonto);
    
            setTimeout(() => {
                spanMessagePonto.remove();
            }, 2000);
        } else {
            message.textContent = "Nome errado! Por favor, tente novamente";
        }
    });
};

const nextImage = () => {
    btnNext.remove();
    message.innerHTML = "";
    visibleFormBtn();
    let input = (document.getElementById("text").value = "");

    const filhoSpan = span.firstChild;
    filhoSpan.remove();

    addImgInSpan();
};

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
};

const localStorageIntoDOM = () => {
    points.innerHTML = localStorage.ponto;

    if (points.innerHTML == "undefined") {
        points.innerHTML = 0;
    }
};
localStorageIntoDOM();

const savePointsLocalStorage = (contador) => {
    localStorage.setItem("ponto", contador);
    localStorage.setItem("contador", contador);
};

const deletePoints = () => {
    localStorage.clear();
    points.textContent = 0;
    removeButtonHtml(btnDelete);
};

const btnDeletee = () => {
    const containerPointsDelete = document.getElementById(
        "container-points-and-button"
    );

    if (localStorage.ponto >= 1) {
        btnDelete.innerHTML = `<button id="btn-delete-points" class="btn-delete-points" onClick="deletePoints()">Deletar pontos</button>`;
        containerPointsDelete.append(btnDelete);
    }
};
btnDeletee();

const endGame = () => {
    document.location.reload(true);
};
