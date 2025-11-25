let cardContainer = document.querySelector(".card-container");
let datas = [];

async function startSearch(){
  let response = await fetch("data.json");
  datas = await response.json();
  renderCards(datas);
  console.log(datas);
}

function renderCards(datas){
  for (let data of datas) {
    let article = document.createElement("article");
    article.classList.add("recipe-card");
    article.innerHTML = `
      <div class="recipe-image-container">
        <img src="https://cdn.europosters.eu/image/750/34557.jpg" alt="A imagem de um espeto de carne grelhado, pronto para consumo." class="recipe-image">
      </div>

      <div class="recipe-info">
          <h3 class="recipe-name">Meat Skewer</h3>
          <p class="recipe-type">Type: Skewer</p>
          <p class="recipe-description">An easy blend of meat and mushrooms grilled to restore health.</p>

          <div class="recipe-details">
              <p class="recipe-effects">
                  **Effects:** <span class="effect-hearts">3 Hearts</span>
              </p>
              
              <div class="recipe-ingredients">
                  <h4>Ingredients:</h4>
                  <ul role="list">
                      <li class="ingredient-item">
                          <span class="item-quantity">1x</span> Raw Meat
                      </li>
                      <li class="ingredient-item">
                          <span class="item-quantity">1x</span> Any Mushroom
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    `
    cardContainer.appendChild(article);
  }
}