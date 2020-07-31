// Asigno los elementos HTML a variables del DOM para manipularlas
const suscribeForm = document.querySelector(".form");
const suscribeInput = document.querySelector(".suscribe-input");
const suscribeButton = document.querySelector(".suscribe-button");
const cards = document.querySelectorAll(".card");
const modalOuter = document.querySelector(".modalOuter");
const modalInner = document.querySelector(".modalInner");
const closeButton = document.querySelector(".closeButton");
const suscribeSection = document.querySelector(".suscribe-section");
const validationMessage = document.querySelector(".validationMessage");

// Funciones
function openModal(e) {
  e.preventDefault();
  const card = e.currentTarget.closest(".card");
  const cardImg = card.querySelector("img").src;
  const title = card.querySelector("h3").textContent;
  const description = card.getAttribute("data-description");
  modalInner.innerHTML = `
    <img src="${cardImg}" class="modalImg"/>
    <div class="modalInfo">
      <h2>${title}</h2>
      <br/>
      <p>${description}</p>
    </div>
    <button class="closeButton">
      <img
        src="https://image.flaticon.com/icons/svg/2919/2919543.svg"
        alt="close button"
      />
    </button>
    `;
  modalOuter.classList.add("open");

  // Funcionalidad para cerrar el modal
  let closeButton = modalInner.querySelector(".closeButton");
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    closeButton.removeEventListener("click");
  });
}

function closeModal() {
  modalOuter.classList.remove("open");
}

function validateMail(input) {
  const mailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return mailRegex.test(input);
}

function handleSuscribeForm(e) {
  e.preventDefault();
  const result = validateMail(suscribeInput.value);
  if (result === false) {
    validationMessage.classList.add("wrongMail");
    validationMessage.textContent = `Oops! The address "${suscribeInput.value}" doesn't exist. Please enter a valid email address (e.g. janedoe@example.com)`;
    suscribeForm.reset();
  } else {
    suscribeButton.style = "background-color: #40db64";
    suscribeInput.style = "border-color: #40db64";
    suscribeButton.value = "Done!";
    validationMessage.textContent = "";
  }
}

// EVENT LISTENERS
cards.forEach((card) => {
  card.addEventListener("click", openModal);
});

modalOuter.addEventListener("click", (e) => {
  // Condicion booleana que devuelve 'true' (por eso el !) si se hace click fuera del modal interior.
  const isOutside = !e.target.closest(".modalInner");
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

suscribeForm.addEventListener("submit", handleSuscribeForm);
