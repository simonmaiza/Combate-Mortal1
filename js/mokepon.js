
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones
let inputScorpion
let inputSubZero
let inputRaiden
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonHielo
let botonRayo
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3 
let lienzo = mapa.getContext("2d")
let intervalo

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto 
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let scorpion = new Mokepon('Scorpion','./assets/Scorpion2.jpg' , 5)

let subZero = new Mokepon('SubZero','./assets/subzero1.jpg' , 5)

let raiden = new Mokepon('Raiden','./assets/raiden2.jpg' , 5)

subZero.ataques.push(
    { nombre: '❄', id: 'boton-hielo' },
    { nombre: '❄', id: 'boton-hielo' },
    { nombre: '❄', id: 'boton-hielo' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
)

raiden.ataques.push(
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '❄', id: 'boton-hielo' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

scorpion.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '❄', id: 'boton-hielo' },
    { nombre: '⚡', id: 'boton-rayo' },
)

mokepones.push(scorpion,subZero,raiden)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p id="nombres">${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputScorpion = document.getElementById('Scorpion')
     inputSubZero = document.getElementById('SubZero')
     inputRaiden = document.getElementById('Raiden')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    //sectionSeleccionarAtaque.style.display = 'flex'

    sectionVerMapa.style.display = "flex"

    iniciarMapa()
    
    if (inputScorpion.checked) {
        spanMascotaJugador.innerHTML = inputScorpion.id
        mascotaJugador = inputScorpion.id
    } else if (inputSubZero.checked) {
        spanMascotaJugador.innerHTML = inputSubZero.id
        mascotaJugador = inputSubZero.id
    } else if (inputRaiden.checked) {
        spanMascotaJugador.innerHTML = inputRaiden.id
        mascotaJugador = inputRaiden.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}



function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-hielo')
     botonTierra = document.getElementById('boton-rayo')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#302d2a'
                boton.disabled = true   
            } else if (e.target.textContent === '❄') {
                ataqueJugador.push('HIELO')
                console.log(ataqueJugador)
                boton.style.background = '#302d2a'
                boton.disabled = true  
            } else {
                ataqueJugador.push('RAYO')
                console.log(ataqueJugador)
                boton.style.background = '#302d2a'
                boton.disabled = true  
            }
            ataqueAleatorioEnemigo()
        })
    })
    

}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('HIELO')
    } else {
        ataqueEnemigo.push('RAYO')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'RAYO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='HIELO' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'RAYO' && ataqueEnemigo[index] === 'HIELO') {   
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATARON")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("GANASTE")
    } else {
        crearMensajeFinal("PERDISTE MUERTO")
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal


    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarPersonaje(){
    scorpion.x = scorpion.x + scorpion.velocidadX
    scorpion.y = scorpion.y +scorpion.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(scorpion.mapaFoto,scorpion.x,scorpion.y,scorpion.ancho,scorpion.alto)
}

function moverDerecha(){
    scorpion.velocidadX = 5
}

function moverIzquierda(){
    scorpion.velocidadX = -5
}

function moverAbajo(){
    scorpion.velocidadY = 5
}

function moverArriba(){
    scorpion.velocidadY = -5
}

function detenerMovimiento(){
    scorpion.velocidadX = 0
    scorpion.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
    
        case "ArrowDown":
            moverAbajo()
            break
        
        case "ArrowLeft":
            moverIzquierda()
            break   

        case "ArrowRight":
            moverDerecha()
            break

        default:
            break
    }
}

function iniciarMapa (){
    intervalo = setInterval(pintarPersonaje, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup" , detenerMovimiento)
}
window.addEventListener('load', iniciarJuego)