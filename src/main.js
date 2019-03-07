/* global google, $*/
const urlData = 'https://faog.github.io/SCL008-data-lovers/src/data/pokemon/pokemon.json'

/*Función que imprime todos los pokémon*/
function pokemonAll(){
    getPokemonData((data)=>{
        showPokemonList(data.pokemon);
    });
}

/* Funcion que procesa los datos según la función que es pasada como parametro */
function getPokemonData(manipulationData){
    fetch(urlData).then((response)=>{
        return response.json();
    }).then(manipulationData);
}

/*I.Declaración de vistas*/

/*a)Pagina de inicio*/
function indexView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="welcomeimage">
        <h2 class="center-align">¿QUIERES SER EL MEJOR MAESTRO POKÉMON?</h2>          
        <h3 class="center-align">Junto a PokeChoose podrás conseguirlo</h3>
        <div class="center-align"> 
            <button id="btnstart">Comenzar</button>
        </div>     
    </section>   

    <h3 id="curiositytitle">¿Sabías qué?</h3>
    <h4 id="curiosity">Existen 14 tipos de Pokémon en la Región de Kanto, donde el mayor porcentaje son los tipo Poison.</h4>
    
    <figure id="staticstype">
        
    </figure>`

    document.getElementsByTagName('button')[0].addEventListener('click', () =>{
        searchView(); 
    })

    /*Inicio implementación Google Chart*/
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      getPokemonData((data)=>{
        let dataType = new Array(["Tipo","Cantidad"]);
        window.data.computeStats(data.pokemon).forEach(element => {
          dataType.push(element);
        });
  
        let pieData = google.visualization.arrayToDataTable(dataType);
  
        let options = {
          chartArea:{width:'80%',height:'80%'},
          legend:{position: 'top', textStyle: {color: '#212F3C', fontSize: 24}},
          is3D: true,
          fontSize:22,
          colors: ['#009688','#263238', '#FFA000', '#FFCA28','#FF80AB','#BCAAA4','#DD2C00','#26C6DA','#CE93D8','#4CAF50','#A1887F','#40C4FF','#FFAB91',
          '#7E57C2','#4A148C','#6D4C41','#607D8B', '#0091EA']
        };
  
        let chart = new google.visualization.PieChart(document.getElementById('staticstype'));
  
        chart.draw(pieData, options);
      })      
    } 
    /*Fin implementación Google Chart*/
}

/*b)Pagina tutorial*/
function tutorialView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="onetutorial" class="row" >       
        <h3>¿Qué es PokeChoose?</h3>        
        <article class="col s12 m12 l8"> 
            <h4>PokeChoose es una entretenida enciclopedia virtual pensada en aquellos jugadores de 
            Pokémon Go que necesiten conocer en profundidad el mundo Pokémon de la Región de Kanto.</h4> 
        </article> 
        <picture id="goldpokeball" class="col s12 m12 l4">
            <img src="Image/pokeballtutorial.png"  alt="Pokebola dorada"/>        
        </picture>       
    </section> 
    <section id="twotutorial" class="row"> 
        <h3>¡Conócelos a todos!</h3>
        <article class="col s12 m12 l6">
            <h4>Podrás escoger entre los 151 tipos de Pokémon de la región de Kanto, cuál es la que más 
            te sirve para enfrentarlo en una batalla, ¡y así convertirte en el mejor entrenador!</h4>
        </article>
        <picture class="col s12 m12 l6">
            <img src="Image/pokemontutorial.png" id="startedpokemon" alt="Pokemon inicio"/>        
        </picture>       
    </section> 
    <section id="threetutorial" class="row"> 
        <h3>¿Cómo funciona PokeChoose?</h3>     
        <h4>Debes ingresar a la opcion "Iniciar búsqueda" y seguir los siguientes pasos:</h4>
    </section>
    <article id="instructionone" class="row">  
        <h4 class="col s12 m12 l6">Primero, lo primero: para encontrar al Pokémon que buscas ¡debes seleccionar tu filtro!</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial001.png" id="tutorialsearchone" alt="Página de búsqueda"/>        
        </picture>
    </article>
    <article id="instructiontwo" class="row">              
        <h4 class="col s12 m12 l6">Si quisieras encontrar a los pokémon por tipo, sólo debes dar click en filtrar por tipo y seleccionar el que estás buscando, en este caso buscamos por tipo "Electric".</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial002.png" id="tutorialsearchtwo" alt="Selección de filtro Pokémon de tipo Electric"/>        
        </picture>
    </article>
        
    <article id="instructionthree" class="row">
        <h4 class="col s12 m12 l6">Ahora la página te mostrará todos los pokémon que sean de tipo "Electric".</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial003.png" id="tutorialsearchthree" alt="Pokémon de tipo Electric"/>        
        </picture>
    </article>    
    <article id="instructionfour" class="row">    
        <h4 class="col s12 m12 l6">Y si quisieras conocer las características de algún pokémon en específico sólo debes darle click en la foto del que deseas mirar y podrás ver su ficha en detalle.</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial004.png" id="tutorialsearchfour" alt="Ficha de Pikachu"/>        
        </picture> 
    </article>
    <article id="instructionfive" class="row">
        <h4>¡Y listo! Ahora estás preparado para encontrar y conocer a tu Pokémon favorito. Podrás filtrar por tipo, debilidad, cantidad de candys, distancia en km para encontrar sus huevos, o bien ordenar alfabéticamente, número, peso o altura.</h4>    
    </article>        
    `
}

/*c)Pagina de búsqueda*/
function searchView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="searchview" class="row"> 
    <h4 id="search" class="col s12 m12 l4 md 5">¡Este es tu buscador!</h4>
    <h3 class="col s12 m12 l8">Pokémon región de Kanto</h3>  
    
        <section class="col s12 m12 l4" id="sectionfilter">
        <h5> Selecciona una opción</h5>
            <ul class="collapsible">
                <li>
                    <div class="collapsible-header">Filtrar</div>
                    <div class="collapsible-body">
                        <label>Tipo</label>
                        <select id="type" class="browser-default">
                            <option value="all">Todos</option>
                            <option value="Bug">Bug</option>
                            <option value="Dark">Dark</option>
                            <option value="Dragon">Dragon</option>                            
                            <option value="Electric">Electric</option>
                            <option value="Fairy">Fairy</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Fire">Fire</option>
                            <option value="Flying">Flying</option>
                            <option value="Ghost">Ghost</option>
                            <option value="Grass">Grass</option>
                            <option value="Ground">Ground</option>
                            <option value="Ice">Ice</option>
                            <option value="Normal">Normal</option>
                            <option value="Poison">Poison</option>
                            <option value="Psychic">Psychic</option>                            
                            <option value="Rock">Rock</option> 
                            <option value="Steel">Steel</option>
                            <option value="Water">Water</option>
                        </select>   
                        <label>Debilidad</label>
                            <select id="weakness" class="browser-default">                             
                            <option value="all">Todos</option>
                            <option value="Bug">Bug</option>
                            <option value="Dark">Dark</option>
                            <option value="Dragon">Dragon</option>                            
                            <option value="Electric">Electric</option>
                            <option value="Fairy">Fairy</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Fire">Fire</option>
                            <option value="Flying">Flying</option>
                            <option value="Ghost">Ghost</option>
                            <option value="Grass">Grass</option>
                            <option value="Ground">Ground</option>
                            <option value="Ice">Ice</option>
                            <option value="Normal">Normal</option>
                            <option value="Poison">Poison</option>
                            <option value="Psychic">Psychic</option>                            
                            <option value="Rock">Rock</option> 
                            <option value="Steel">Steel</option>
                            <option value="Water">Water</option>                            
                        </select>     
                        <label>Cantidad de Candy</label>
                        <select id="candycount" class="browser-default">
                            <option value="all">Todos</option>
                            <option value="12">12</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="400">400</option>
                            <option value="notcandy">Sin candy</option>
                        </select>
                        <label>Distancia de huevos para encubar</label>
                        <select id="eggs" class="browser-default">
                            <option value="all">Todos</option>
                            <option value="2 km">2 km</option>
                            <option value="5 km">5 km</option>
                            <option value="10 km">10 km</option>
                            <option value="Not in Eggs">Not in Eggs</option>
                        </select>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">Ordenar</div>
                    <div class="collapsible-body">
                        <label>Nombre</label>
                        <select class="browser-default" id="namesort">
                            <option>Escoja una opción</option>                
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>            
                        </select>  
                        <label>Número</label>
                        <select class="browser-default" id="numsort">
                            <option>Escoja una opción</option>                
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>            
                        </select>  
                        <label>Peso</label>
                        <select class="browser-default" id="weightsort">
                            <option>Escoja una opción</option>                
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>            
                        </select>  
                        <label>Tamaño</label>
                        <select class="browser-default" id="heightsort">
                            <option>Escoja una opción</option>                
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>            
                        </select>  
                    </div>
                </li>
            </ul>       
        </section>           
        
        <section id="pokemonresult" class="col s12 m12 l8" >      
            <h4 id="resulttitle">Escoge un pokémon y ¡descubre sus características!</h4>         
            <figure id="searchresult" class="row">
            
            </figure>
        </section>
    </section>  
    `
    pokemonAll()
    /*Materialize elemento Collapsible*/  
    $('.collapsible').collapsible();
  

    /*Materialize elemento Select*/
    $('select').formSelect();
   
  
    /*III. Filtrar*/

    /*a) Filtro por tipo de pokemon*/
    document.getElementById('type').addEventListener('change',()=>{
        let condition =document.getElementById('type').value;
        if(condition==='all'){
            pokemonAll();
        }else {
            getPokemonData((data) => {
                let result = window.data.filterData(data.pokemon, (element)=>{
                    return element.type.includes(condition);
                });
                showPokemonList(result);
            });
        }
    });
    
    /*b) Filtro por debilidad de pokemon*/    
    document.getElementById('weakness').addEventListener('change',()=>{
        let condition=document.getElementById('weakness').value; 
        if(condition==='all'){
            pokemonAll();
        }else {
            getPokemonData((data)=>{
                let result = window.data.filterData(data.pokemon, (element)=>{
                    return element.weaknesses.includes(condition);
                });
                showPokemonList(result);
            })
            
        }
    });

    /*c) Filtro por cantidad de candys*/    
    document.getElementById('candycount').addEventListener('change',()=>{
        let condition=document.getElementById('candycount').value; 
        if(condition==='all'){
            pokemonAll();
        }else {
            getPokemonData((data)=>{
                let result=window.data.filterData(data.pokemon,(element)=>{
                    if (condition==="notcandy"){
                        return element.candy_count===undefined;
                    }else{
                        return element.candy_count=== parseInt(condition);
                    }
                });
                showPokemonList(result);
            })
        }
    });

    /*d) Filtro por distancia para incubar huevos*/    
    document.getElementById('eggs').addEventListener('change',()=>{
        let condition=document.getElementById('eggs').value; 
        if(condition==='all'){
            pokemonAll();
        }else {
            getPokemonData((data)=>{
                let result=window.data.filterData(data.pokemon,(element)=>{
                    return element.egg===(condition)
                });
                showPokemonList(result);
            })

        }
    });

    /*IV. Ordenar*/

    /*a) Ordenar por nombre */
    document.getElementById('namesort').addEventListener('change',()=>{
        let sortOrder =document.getElementById('namesort').value;
        getPokemonData((data)=>{
            let result =window.data.sortData(data.pokemon,'name',sortOrder);
            showPokemonList(result);
        })
        
    });

    /*b) Ordenar por numero */
    document.getElementById('numsort').addEventListener('change',()=>{
        let sortOrder =document.getElementById('numsort').value;
        getPokemonData((data)=>{
            let result =window.data.sortData(data.pokemon,'num',sortOrder);
            showPokemonList(result);
        })
    });

    /*c) Ordenar por peso */
    document.getElementById('weightsort').addEventListener('change', ()=>{
        let sortOrder =document.getElementById('weightsort').value;
        getPokemonData((data)=>{
            let result =window.data.sortData(data.pokemon, 'weight', sortOrder);
            showPokemonList(result);
        })

    });

    /*d) Ordenar por altura*/
    document.getElementById('heightsort').addEventListener('change',()=>{
        let sortOrder =document.getElementById('heightsort').value;
        getPokemonData((data)=>{
            let result =window.data.sortData(data.pokemon,'height',sortOrder);
            showPokemonList(result);
        })
    });    
}

/*II.Manejo del DOM */

/*a)Página de inicio*/
document.getElementsByTagName('a')[0].addEventListener('click', () => {
    indexView();
})

/*b)Página Tutorial*/
Array.from(document.getElementsByClassName('tutorial')).forEach(element => {
    element.addEventListener('click', () =>{
        tutorialView();
    })
});


/*c) Página Busqueda*/
Array.from(document.getElementsByClassName('search')).forEach(element => {
    element.addEventListener('click', () =>{
        searchView();
       
    })
});

/*Dibuja la lista de pokemon dependiendo del arreglo de pokemones recibido */
function showPokemonList(jsonData)
{
    document.getElementById('searchresult').innerHTML='';
    jsonData.forEach(element => {
        //Pre-Evoluciones
        let preEvolutions = "";
        if(element.prev_evolution){
            element.prev_evolution.forEach(pre => {
                preEvolutions += `<p>${pre.name}</p>`
            })
        }
        else {
            preEvolutions += "Ninguna";
        }
        //Evoluciones siguientes
        let nextEvolutions = "";
        if(element.next_evolution){
            element.next_evolution.forEach(next => {
                nextEvolutions += `<p>${next.name}</p>`
            })
        }
        else {
            nextEvolutions += "Ninguna";
        }

        /*d) Impresión modal con información de cada pokémon*/
        document.getElementById('searchresult').innerHTML +=
        `
        <div id="pokemonbox" class="col s12 m6 l4">
            <!--Llamada al modal -->
            <a href="#modal${element.num}" class="modal-trigger">
                <!--Información visible antes de elegir el modal-->
                <img src="${element.img}" alt="${element.name}"/>
                <h6>${element.num}</h6>
                <h6>${element.name}</h6>
            </a>  
            <div id="modal${element.num}" class="modal">
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect btn-flat">X</a>
                </div>
                <!--Información de la ficha de pokemon (modal)-->
                <div class="modal-content row">                                    
                    <h6 class="elementdatatitle">${element.num}</h6>
                    <h6 class="elementdatatitle">${element.name}</h6>
                    <div class="col s12 m12 l12">
                        <img class="modalimg" src="${element.img}" alt="${element.name}"/>
                    </div>
                    <div class="row">
                        <h6 class="col s4 m4 l4 elementtitle">Tipo</h6>
                        <h6 class="col s4 m4 l4 elementtitle">Peso</h6>
                        <h6 class="col s4 m4 l4 elementtitle">Altura</h6>
                        <h6 class="col s4 m4 l4 elementdata">${element.type}</h6>
                        <h6 class="col s4 m4 l4 elementdata">${element.weight}</h6>
                        <h6 class="col s4 m4 l4 elementdata">${element.height}</h6>
                    </div>
                      
                    <div class="row">
                        <h6 class="elementtitle">Debilidades</h6>
                        <h6 class="elementdata">${element.weaknesses}</h6>
                    </div>

                    <div class="row">
                        <h6 class="col s6 m6 l6 elementtitle">Cantidad de candys</h6>
                        <h6 class="col s6 m6 l6 elementtitle">Km huevos</h6>
                        <h6 class="col s6 m6 l6 elementdata">${element.candy_count?element.candy_count:"Sin candys"}</h6>
                        <h6 class="col s6 m6 l6 elementdata">${element.egg}</h6>
                        <h6 class="col s6 m6 l6 elementtitle">Evolución previa</h6>
                        <h6 class="col s6 m6 l6 elementtitle">Evolución Posterior</h6>
                        <h6 class="col s6 m6 l6 elementdata ">${preEvolutions}</h6>
                        <h6 class="col s6 m6 l6 elementdata">${nextEvolutions}</h6>
                    </div>   
                </div>
            </div>
        </div>
        `
          
    });
    /*Materialize elemento Modal*/
    $('.modal').modal();
}
