const pokemonList = document.getElementById('pokemonList')
const paginationButton = document.getElementById('paginationButton')
const maxRecords = 151 // quantidade de pokemons da primeira geração
const limit = 10
let offset = 0;



function loadPokemonsItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}" onclick="detailModal(${pokemon.number})">
                <div>
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
            <div id="detail-${pokemon.number}" class="detailPopup" hidden>
                <div class="detailPopup__content ${pokemon.type}">
                    <div class="detailPopup__top">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <div class="detailPopup__bottom">
                        <div class="detailPopup__titles">
                            <span class="title">Height</span>
                            <span class="title">Weight</span>
                            <span class="title">Ability</span>
                        </div>
                        <div class="detailPopup__values">
                            <span class="value">${pokemon.height}</span>
                            <span class="value">${pokemon.weight}</span>
                            <span class="value">${pokemon.abilities}</span>
                        </div>
                    </div>
                    <span class="close" onclick="removeSpan(${pokemon.number})">&times;</span>
                </div>
            </div>
        `
        ).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonsItens(offset, limit)

paginationButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit
    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItens(offset, newLimit)

        paginationButton.parentElement.removeChild(paginationButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})

function detailModal(pokemonNumber) {
    
    let modalDetailPopup = document.getElementById(`detail-${pokemonNumber}`)
    let hidden = modalDetailPopup.getAttribute("hidden")

    modalDetailPopup.style.display = "block"

    if(hidden) {
        modalDetailPopup.removeAttribute("hidden");
    } else {
        modalDetailPopup.setAttribute("hidden", "hidden");
    }
}

function removeSpan(pokemonNumber) {
    let modalDetailPopup = document.getElementById(`detail-${pokemonNumber}`)

    modalDetailPopup.style.display = "none"
}