let cardContainer = document.querySelector(".card-container");
let searchField = document.querySelector("header input");
let datas = [];

async function startSearch(){
  if( datas.length === 0){
    try{
      let response = await fetch("data.json");
      datas = await response.json();
    } catch {
      console.error("failed to fetch", error);
      return;
    }
  }
  
  const searchTerm = searchField.value.toLowerCase();
  let filteredData = datas.filter(data => {
      
    const nameMatch = data.name.toLowerCase().includes(searchTerm);
      
    const ingredientMatch = data.ingredients.some(ing => ing.item.toLowerCase().includes(searchTerm));
    
    return nameMatch || ingredientMatch;
  });

    renderCards(filteredData);

}

function renderCards(datas){
  cardContainer.innerHTML = "";
  for (let data of datas) {
    let article = document.createElement("article");
    article.classList.add("recipe-card");

    let ingredientsList = data.ingredients
    .map(ing => `
      <li class="ingredient-item">
        <span class="item-quantity">${ing.quantity}</span> ${ing.item}
      </li>`)
    .join("");
    
    article.innerHTML = `
      <div class="recipe-image-container">
        <img src="https://cdn.europosters.eu/image/750/34557.jpg" alt="A imagem de um espeto de carne grelhado, pronto para consumo." class="recipe-image">
      </div>

      <div class="recipe-info">
          <h3 class="recipe-name">${data.name}</h3>
          <p class="recipe-type">Type: ${data.type}</p>
          <p class="recipe-description">${data.description}</p>
          <div class="recipe-details">
              <p class="recipe-effects">
                  <strong>Effects:</strong> <span class="effect-hearts">${data.effects.hearts} Hearts</span> 
                  <strong>Uses:</strong> <span class="effect-uses">${data.uses}</span> 
              </p>
              
              <div class="recipe-ingredients">
                  <h4>Ingredients:</h4>
                  <ul role="list">
                    ${ingredientsList}
                </ul>
              </div>
          </div>
      </div>
    `
    cardContainer.appendChild(article);
  }
}