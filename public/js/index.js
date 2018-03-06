"use strict";

let userBase64 = "";

/*
 * Manejador que se ejecuta cuando el DOM se haya cargado.
 */
$(() => {
    $(".row.login-register button.btn-primary").on("click", iniciarSesion);
    $(".row.login-register button.btn-outline-secondary").on("click", crearUsuario);
});

function mostrarError(className, msg) {
    let o = $('<div>').addClass('row').append(
        $('<div>').addClass('col').append(
            $('<div>').addClass('alert').addClass('alert-danger').prop('role', 'alert').text(msg)
        )
    );
    $(className).after(o);
    setTimeout(() => {
        o.fadeOut('slow');
        o.remove();
    }, 2000);
}

function mostrarExito(className, msg) {
    let o = $('<div>').addClass('row').append(
        $('<div>').addClass('col').append(
            $('<div>').addClass('alert').addClass('alert-success').prop('role', 'alert').text(msg)
        )
    );
    $(className).after(o);
    setTimeout(() => {
        o.fadeOut('slow');
        o.remove();
    }, 2000);
}

function iniciarSesion(e) {
    let name = $("#inputUser").val();
    let pass = $("#inputPass").val();
    if (name.length === 0 || pass.length === 0) {
        mostrarError(".login-register", "Rellena todos los campos.");
        return;
    }
    $.ajax({
        type: "GET",
        url: "/entrarUsuario/" + name + "/" + pass,
        success: function(data, textStatus, jqXHR) {
            sesionIniciada(name, pass);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
            //console.log(jqXHR.status);

        }
    });
}


function crearUsuario(e) {
    let name = $("#inputUser").val();
    let pass = $("#inputPass").val();

    if (name.length === 0 || pass.length === 0) {
        mostrarError(".login-register", "Rellena todos los campos.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "/nuevoUsuario",
        contentType: "application/json",
        data: JSON.stringify({
            nombre: name,
            contra: pass
        }),
        success: function(data, textStatus, jqXHR) {
            sesionIniciada(name, pass);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
            //mostrarError(".login-register", "Rellena todos los campos.");
        }
    });
}

function sesionIniciada(nombre, pass) {
    userBase64 = btoa(nombre + ":" + pass);
    $("#inputUser").val('');
    $("#inputPass").val('');

    $(".row.login-register button.btn-primary").off();
    $(".row.login-register button.btn-outline-secondary").off();
    $(".row.login-register").addClass("d-none");
    $("nav div").removeClass("d-none").children("span").text(nombre);
    $("nav button").on("click", cerrarSesion);
    $(".welcome-panel").addClass("d-none");
    $(".nav-tabs").removeClass("d-none");
    $(".tab-content").removeClass("d-none");

    $("#home .crear-partida button").on("click", crearPartida);
    $("#home .unirse-partida button").on("click", addJugadorPartida);
    getMatches();
    $(".nav-tabs").on("click", "a", (e) => {
        $(e.target).tab('show');
    })
}

function crearPartida(e) {
    let name = $(".nueva-partida input").val();

    if (name.length === 0) {
        mostrarError('.nueva-partida', 'Error. Campo vacío.');
        return;
    }

    $.ajax({
        method: "POST",
        url: "/crearPartida",
        contentType: "application/json",
        data: JSON.stringify({
            nameGame: name
        }),
        beforeSend: (req) => {
            req.setRequestHeader("Authorization", "Basic " + userBase64);
        },
        success: function(data, textStatus, jqXHR) {
            mostrarExito('.nueva-partida', 'Partida creada con éxito.');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}

function addJugadorPartida(e) {
    let id = $(".unirse-partida input").val();

    if (id === undefined || id.length === 0) {
        mostrarError('.unirse-partida', 'Error. Campo vacío.');
        return;
    } else {
        let aux = Number(id);
        if (isNaN(aux) || aux < 0) {
            mostrarError('.unirse-partida', 'Error. Introduce un número positivo.');
            return;
        }
    }

    $.ajax({
        method: "POST",
        url: "/incorporarseAPartida",
        contentType: "application/json",
        data: JSON.stringify({
            idGame: id
        }),
        beforeSend: (req) => {
            req.setRequestHeader("Authorization", "Basic " + userBase64);
        },
        success: function(data, textStatus, jqXHR) {
            console.log("NOMBRE DE PARTIDAAAAA: " + data.partida);
            mostrarExito('.unirse-partida', 'Jugador añadido con éxito a la partida.');
            $("#home .list-group").append($("<a>").addClass("list-group-item").addClass("list-group-item-action").prop('href', '#profile').data('id', id).text(data.partida));
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}



function cerrarSesion(e) {
    userBase64 = "";


    $(".row.login-register button.btn-primary").on("click", iniciarSesion);
    $(".row.login-register button.btn-outline-secondary").on("click", crearUsuario);
    $(".row.login-register").removeClass("d-none");
    $("nav div").addClass("d-none").children("span").text('');
    $("nav button").off();

    $(".welcome-panel").removeClass("d-none");
    $(".nav-tabs").addClass("d-none");
    $(".tab-content").addClass("d-none");

    $("#home .col button").off();

    $(".nueva-partida input").val('');
    $(".unirse-partida input").val('');
}

function getMatches() {
    if ($("#home .list-group").length > 0) {
        $("#home .list-group").off();
        $("#home .list-group").parent().parent().remove();
    }
    $.ajax({
        method: "GET",
        url: "/obtenerPartidasUsuario",
        beforeSend: (req) => {
            req.setRequestHeader("Authorization", "Basic " + userBase64);
        },
        success: function(data, textStatus, jqXHR) {
            let l = $("<div>").addClass("list-group");
            for (let d of data.partidas) {
                l.append($("<a>").addClass("list-group-item").addClass("list-group-item-action").prop('href', '#partida' + d.id).data('id', d.id).text(d.nombre));
            }
            let o = $("<div>").addClass("row").addClass("mb-3").append(
                $("<div>").addClass("col").append(l)
            );
            $(".unirse-partida").after(o);
            $("#home .list-group").on("click", "a", cargarInfoPartida);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}


function cargarInfoPartida(e) {
    let id = $(e.target).data('id');
    if ($(".nav-tabs #partida" + id + "-tab").length !== 0) {
        $(".nav-tabs #partida" + id + "-tab").tab('show');
        return;
    }
    $.ajax({
        type: "GET",
        url: "/obtenerEstadoPartida",
        data: { idGame: id },
        beforeSend: (req) => {
            req.setRequestHeader("Authorization", "Basic " + userBase64);
        },
        success: function(data, textStatus, jqXHR) {
            $(".nav-tabs").append(DOMtab(id, $(e.target).text()));
            $(".tab-content").append(DOMtabContent(id, $(e.target).text(), data.usuarios));
            $('.nav-tabs a[href="#partida' + id + '"]').tab('show');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}

function DOMtab(id, name) {
    /*
    <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Familiar</a>
        </li>
    */
    let r = $("<li>").addClass('nav-item');
    r.append(
        $("<a>").addClass('nav-link')
        .prop('id', 'partida' + id + '-tab')
        .data('toggle', 'tab')
        .prop('href', '#partida' + id)
        .prop('role', 'tab')
        .prop('aria-controls', 'partida' + id)
        .prop('aria-selected', 'false')
        .text(name)
    );
    return r;
}

function DOMtabContent(id, name, data) {
    /*
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    */

    let r = $("<div>").addClass("tab-pane").addClass('fade')
        .prop('id', 'partida' + id)
        .prop('role', 'tabpanel')
        .prop('aria-labelledby', 'partida' + id + '-tab');
    let o = $("<div>").addClass("row");
    let c = $("<div>").addClass("col mb-3");
    c.append(
        $("<div>").addClass("row rounded bg-light border border-secondary p-2 py-4 m-0").append(
            $("<div>").addClass("col").append(
                $("<div>").addClass("h5").text(name)
            )
            .append(
                $("<span>").text('') // ++++
            )
        )
        .append(
            $("<div>").addClass("col-lg-4 text-right").append(
                $("<button>").addClass("btn btn-primary").text('Actualizar partida')
            )
        )
    );
    let c2 = $("<div>").addClass("col-md-4");
    let ul = $("<ul>").addClass("list-group")
        .append(
            $("<li>").addClass('list-group-item bg-light').text('Jugadores')
        );
    let tbody = $("<tbody>");
    for (let p of data) {
        tbody.append(
            $("<tr>").append(
                $("<td>").text(p.login)
            )
            .append(
                $("<td>").text('--')
            )
        )
    }
    let li = $("<li>").addClass('list-group-item').append(
        $("<table>").addClass('table').append(
            $("<thead>").append($("<tr>")
                .append($("<th>").prop('scope', 'col').text('Nombre'))
                .append($("<th>").prop('scope', 'col').text('Nº cartas'))
            )
        ).append(tbody)
    );
    ul.append(li);
    c2.append(ul);
    o.append(c).append(c2);
    r.append(o);
    return r;
}

/*
beforeSend: (req) => {
  req.setRequestHeader("Authorization", "Basic " + userBase64);
},
*/