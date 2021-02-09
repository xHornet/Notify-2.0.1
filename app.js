const productName = document.querySelector("#productName");
const listo = document.querySelector("#listo");
const borrar = document.querySelector("#borrar");
const productList = document.querySelector("#productList");

const createNewProduct = (name) => {
  const ionCard = document.createElement("ion-card");
  const newProductItem = document.createElement("ion-card-content");
  newProductItem.textContent = name;
  ionCard.appendChild(newProductItem);
  productList.appendChild(ionCard);
};

const updateProductList = () => {
  if (localStorage.getItem("lista")) {
    const lista = JSON.parse(localStorage.getItem("lista"));
    for (let i = 0; i < lista.length; i++) {
      const ionCard = document.createElement("ion-card");
      const newProductItem = document.createElement("ion-card-content");
      newProductItem.textContent = lista[i];
      ionCard.appendChild(newProductItem);
      productList.appendChild(ionCard);
    }
  }
};

const clearInput = () => {
  productName.value = "";
};

const isEmpty = (str) => !str.trim().length;

function localStorageLista() {
  const listaGuardada = JSON.parse(localStorage.getItem("lista"));
  if (listaGuardada) {
    listaGuardada.push(productName.value);
    localStorage.setItem("lista", JSON.stringify(listaGuardada));
  } else {
    localStorage.setItem("lista", JSON.stringify([productName.value]));
  }
}

listo.addEventListener("click", () => {
  const name = productName.value;
  if (isEmpty(name)) {
    console.log("Espacio en blanco");
    return;
  }
  localStorageLista();
  createNewProduct(name);
  clearInput();
});

borrar.addEventListener("click", clearInput);

window.onload = updateProductList();
