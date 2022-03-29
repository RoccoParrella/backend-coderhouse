const boton = document.getElementById('boton-mail');
const email = document.getElementById('email');
const msg = document.getElementById('mensaje');
const namee = document.getElementById('name');
const lastName = document.getElementById('lastName');
const nada = document.getElementById('nada');
const nadaPelis = document.getElementById('nadaPelis');
const mensajeDiv = document.getElementById('divMensajes');
const pelisDiv = document.getElementById('divPelis');
const titulo = document.getElementById('titulo');
const tipo = document.getElementById('tipo');
const duracion = document.getElementById('duracion');
const img = document.getElementById('img');
const showUno = document.getElementById('hidden-uno');
const showDos = document.getElementById('hidden-dos');
const showTres = document.getElementById('hidden-tres');
const enviarPelis = document.getElementById('enviar-pelis');
const compresion = document.getElementById('compresion');

socket = io();

enviarPelis.addEventListener('click', (e) => {
    e.preventDefault();
    if (titulo.value == '' || tipo.value == '' || duracion.value == '' || img.value == '') {
        return
    }
    buttonSubmit(1);
})

boton.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value == '' || msg.value == '' || namee.value == '' || lastName.value == '') {
        return
    }
    buttonSubmit();
})

const buttonSubmit = (a) => {
    if (a == 1) {
        socket.emit('send-pelis', {
            titulo: titulo.value,
            tipo: tipo.value,
            duracion: duracion.value,
            img: img.value
        });
        titulo.value = '';
        duracion.value = '';
        img.value = '';
    } else {
        socket.emit('mensajes', {
            author: {
                email: email.value,
                name: namee.value,
                lastName: lastName.value
            },
            text: msg.value
        })
        email.value = '';
        msg.value = '';
        namee.value = '';
        lastName.value = '';
    }
}

socket.on('mensajesCompleto', (data) => {
    mensajeDiv.innerHTML = '';
    const author = new normalizr.schema.Entity("authors", {}, { idAttribute: "email" });
    const mensaje = new normalizr.schema.Entity("mensajes", {
        author: author
    });
    const schemaA = new normalizr.schema.Entity("data", {
        mensajes: [mensaje]
    });
    const denormalizeData = normalizr.denormalize("mensajes", schemaA, data.entities);
    const porcentaje = (JSON.stringify(denormalizeData).length * 100) / JSON.stringify(data.entities).length;
    const numEntero = parseInt(porcentaje);
    compresion.innerHTML = `No hay datos por el momento!`;
    if (JSON.stringify(data).length !== 86) {
        compresion.innerHTML = `Compresion: ${numEntero}%`;
    }
    renderMsg(denormalizeData);
})

socket.on('send-pelis-completo', (data) => {
    pelisDiv.innerHTML = '';
    renderPelis(data);
})

const renderPelis = (data) => {
    nadaPelis.classList.add('hide');
    showUno.classList.add('show');
    showDos.classList.add('show');
    showTres.classList.add('show');
    data.forEach(e => {
        const divMsg = document.createElement('div');
        divMsg.classList.add('peliculas-form');
        const p_titulo = `<p class="pelicula-titulo">${e.title}</p>`
        const p_duracion = `<p class="pelicula-duracion">${e.duration}</p>`
        const p_img = `<img class="pelicula-img" src="${e.urlImg}">`
        divMsg.innerHTML = p_titulo + p_duracion + p_img;
        pelisDiv.appendChild(divMsg);
    });
}

const renderMsg = (data) => {
    let array = data.mensajes
    nada.classList.add('hide');
    array.forEach(e => {
        const divMsg = document.createElement('div');
        divMsg.classList.add('mensaje');
        const p_avatar = `<img class="avatar" src="${e._doc.author.urlImg}">`
        const p_email = `<p class="mensaje-autor centrar">${e._doc.author.email}</p>`
        const p_name = `<p class="mensaje-autor centrar">${e._doc.author.name}</p>`
        const p_lastName = `<p class="mensaje-autor centrar">${e._doc.author.lastName}</p>`
        const p_msg = `<p class="mensaje-texto centrar">${e._doc.text}</p>`
        divMsg.innerHTML = p_avatar + p_email + p_name + p_lastName + p_msg;
        mensajeDiv.appendChild(divMsg);
    });
}