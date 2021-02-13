const productName = document.querySelector('#productName');
const listo = document.querySelector('#listo');
const borrar = document.querySelector('#borrar');
const productList = document.querySelector('#productList');

const borrarTarea = (index) => {
	const lista = JSON.parse(localStorage.getItem('lista'));
	lista.splice(index, 1);
	localStorage.setItem('lista', JSON.stringify(lista));
	window.location.reload();
	// console.log(index);
};

const createNewProduct = (index) => {
	const ionCard = document.createElement('ion-card');
	const newProductItem = document.createElement('ion-card-content');
	const deleteButton = document.createElement('ion-button');
	ionCard.id = 'tarea';
	deleteButton.innerText = '❌';
	deleteButton.onclick = () => borrarTarea(index);
	newProductItem.textContent = productName.value;
	ionCard.appendChild(newProductItem);
	ionCard.appendChild(deleteButton);
	productList.appendChild(ionCard);
};

const updateProductList = () => {
	if (localStorage.getItem('lista')) {
		console.log(localStorage.getItem('lista'));
		const lista = JSON.parse(localStorage.getItem('lista'));
		for (let i = 0; i < lista.length; i++) {
			const ionCard = document.createElement('ion-card');
			ionCard.id = 'tarea';
			const newProductItem = document.createElement('ion-card-content');
			const deleteButton = document.createElement('ion-button');
			deleteButton.innerText = '❌';
			deleteButton.onclick = () => borrarTarea(i);
			newProductItem.textContent = lista[i];
			ionCard.appendChild(newProductItem);
			ionCard.appendChild(deleteButton);
			productList.appendChild(ionCard);
		}
	}
};

const clearInput = () => {
	productName.value = '';
};

const isEmpty = (str) => !str.trim().length;

function localStorageLista() {
	const listaGuardada = JSON.parse(localStorage.getItem('lista'));
	if (listaGuardada) {
		listaGuardada.push(productName.value);
		localStorage.setItem('lista', JSON.stringify(listaGuardada));
		createNewProduct(listaGuardada.indexOf(productName.value));
	} else {
		localStorage.setItem('lista', JSON.stringify([productName.value]));
	}
}

listo.addEventListener('click', () => {
	if (isEmpty(productName.value)) {
		console.log('Espacio en blanco');
		return;
	}
	localStorageLista();
	clearInput();
});

borrar.addEventListener('click', clearInput);

window.onload = updateProductList();
