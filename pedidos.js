$(function () {
    $(".Agrupacion").droppable({
        drop: function (event, ui) {
            ui.draggable.css({ "left": "", "top": "" })
            $($(this).find(">div")[0]).append(ui.draggable);
            if ($(this).find(".Tarjeta").length == 10) {
                $($(this).find(">div")[0]).empty();
                if (ui.draggable.hasClass("T1")) {
                    CrearTarjeta("T10", "Agrupacion>div");
                    $($(this).find(">div")[0]).append($(".d .Agrupacion>div>div:first-child").addClass("lleva cantidad-10"));
                }
                if (ui.draggable.hasClass("T10")) {
                    CrearTarjeta("T100", "Agrupacion>div");
                    $($(this).find(">div")[0]).append($(".c .Agrupacion>div>div:first-child").addClass("lleva cantidad-100"));
                }
                if (ui.draggable.hasClass("T100")) {
                    CrearTarjeta("T1000", "Agrupacion>div");
                    $($(this).find(">div")[0]).append($(".um .Agrupacion>div>div:first-child").addClass("lleva cantidad-1000"));
                }
                if (ui.draggable.hasClass("T1000")) {
                    CrearTarjeta("T10000", "Agrupacion>div");
                    $($(this).find(">div")[0]).append($(".dm .Agrupacion>div>div:first-child").addClass("lleva cantidad-10000"));
                }
            }

            if (ui.draggable.hasClass("lleva")) {
                let classList = ui.draggable[0].classList;
                for (let i = 0; i < classList.length; i++) {
                    if (classList[i].indexOf("cantidad") == 0) {
                        $(".Tabla ." + classList[i]).text("1");
                    }
                }
            }
        }
    });
});

function incrementar(elemento, seccion, clase) {
    $(elemento).removeClass("OK Error")
    let valor;    
    switch ($(elemento).text()) {
        case "":
            valor = "0";
            break;
        case "9":
            valor = "";
            break;
        default:
            $(elemento).text(1 + parseInt($(elemento).text()));
            break;
    }
    $(elemento).text(valor);
    if (valor != "" && valor != "0") {
        CrearTarjeta(clase, seccion);
    }
    else if (valor == "") {
        let Agrupados;
        switch (clase) {
            case "T1":
                Agrupados = 9 - $(".u ." + seccion + " .Tarjeta").length
                $($(".u .Agrupacion .Tarjeta").splice(0, Agrupados)).remove();
                $(".u ." + seccion).empty();
                break;
            case "T10":
                Agrupados = 9 - $(".d ." + seccion + " .Tarjeta").length
                $($(".d .Agrupacion .Tarjeta").splice(0, Agrupados)).remove();
                $(".d ." + seccion).empty();
                break;
            case "T100":
                Agrupados = 9 - $(".d ." + seccion + " .Tarjeta").length
                $($(".c .Agrupacion .Tarjeta").splice(0, Agrupados)).remove();
                $(".c ." + seccion).empty();
                break;
            case "T1000":
                Agrupados = 9 - $(".um ." + seccion + " .Tarjeta").length
                $($(".um .Agrupacion .Tarjeta").splice(0, Agrupados)).remove();
                $(".um ." + seccion).empty();
                break;
            case "T10000":
                Agrupados = 9 - $(".dm ." + seccion + " .Tarjeta").length
                $($(".dm .Agrupacion .Tarjeta").splice(0, Agrupados)).remove();
                $(".dm ." + seccion).empty();
                break;
        }
    }
}

function CrearTarjeta(clase, seccion) {
    let tarjeta = $("<div>").addClass("Tarjeta " + clase);
    switch (clase) {
        case "T1":
            tarjeta.append($("<span>").text("1"));
            tarjeta.draggable({ containment: ".u", scroll: false });
            $(".u ." + seccion).append(tarjeta);
            break;
        case "T10":
            tarjeta.append($("<span>").text("10"));
            tarjeta.draggable({ containment: ".d", scroll: false });
            $(".d ." + seccion).append(tarjeta);
            break;
        case "T100":
            tarjeta.append($("<span>").text("100"));
            tarjeta.draggable({ containment: ".c", scroll: false });
            $(".c ." + seccion).append(tarjeta);
            break;
        case "T1000":
            tarjeta.append($("<span>").text("1.000"));
            tarjeta.draggable({ containment: ".um", scroll: false });
            $(".um ." + seccion).append(tarjeta);
            break;
        case "T10000":
            tarjeta.append($("<span>").text("10.000"));
            tarjeta.draggable({ containment: ".dm", scroll: false });
            $(".dm ." + seccion).append(tarjeta);
            break;
    }
}

function contar(elemento) {
    $(elemento).removeClass("OK Error")
    let valor;
    switch ($(elemento).text()) {
        case "":
            valor = "0";
            break;
        case "9":
            valor = "";
            break;
        default:
            $(elemento).text(1 + parseInt($(elemento).text()));
            break;
    }
    $(elemento).text(valor);
}

function seleccionarNumero(elemento) {
    $(elemento).addClass("Seleccionado");
    if ($(elemento).hasClass("Error")) {
        $(elemento).removeClass("Error");
    }
}

function validar() {
    let numeros = $(".Numero");
    for (let i = 0; i < numeros.length; i++) {
        if ($(numeros[i]).hasClass("Seleccionado")) {
            $(numeros[i]).addClass("OK");
        }
        else {
            $(numeros[i]).addClass("Error");
        }
    }

    let digitos = $(".Tabla table td button")
    let resultado=0;
    for (let i = 0; i < numeros.length; i++) {
        for (let j = 0; j < 5; j++) {
            if (j>=(5 - $(numeros[i]).text().length)) {
                $(digitos[j + (i * 5)]).addClass($(digitos[j + (i * 5)]).text() == $(numeros[i]).text()[$(numeros[i]).text().length-(5-j)] ? "OK" : "Error");
            }
            else {
                $(digitos[j + (i * 5)]).addClass($(digitos[j + (i * 5)]).text() == "" ? "OK" : "Error");
            }
        }
        resultado=resultado+parseInt($(numeros[i]).text());
    }
    resultado=resultado.toString();
    $(".Tarjeta").removeClass("Error");
    for (let j = 0; j < 5; j++) {
        if (j>=(5 - resultado.length)) {
            $(digitos[j + (numeros.length * 5)]).addClass($(digitos[j + (numeros.length * 5)]).text() == resultado[resultado.length-(5-j)] ? "OK" : "Error");
            switch(j){
                case 4:
                if($(".u .Tarjeta").length!=parseInt(resultado[resultado.length-(5-j)])){
                    $($(".u .Tarjeta").splice(0,$(".u .Tarjeta").length-resultado[resultado.length-(5-j)])).addClass("Error");
                }
                break;
                case 3:
                if($(".d .Tarjeta").length!=parseInt(resultado[resultado.length-(5-j)])){
                    $($(".d .Tarjeta").splice(0,$(".d .Tarjeta").length-resultado[resultado.length-(5-j)])).addClass("Error");
                }
                break;
                case 2:
                if($(".c .Tarjeta").length!=parseInt(resultado[resultado.length-(5-j)])){
                    $($(".c .Tarjeta").splice(0,$(".c .Tarjeta").length-resultado[resultado.length-(5-j)])).addClass("Error");
                }
                break;
                case 1:
                if($(".um .Tarjeta").length!=parseInt(resultado[resultado.length-(5-j)])){
                    $($(".um .Tarjeta").splice(0,$(".um .Tarjeta").length-resultado[resultado.length-(5-j)])).addClass("Error");
                }
                break;
                case 0:
                if($(".dm .Tarjeta").length!=parseInt(resultado[resultado.length-(5-j)])){
                    $($(".dm .Tarjeta").splice(0,$(".dm .Tarjeta").length-resultado[resultado.length-(5-j)])).addClass("Error");
                }
                break;
            }
            
        }
        else {
            $(digitos[j + (numeros.length * 5)]).addClass($(digitos[j + (numeros.length * 5)]).text() == "" ? "OK" : "Error");
        }
    }
}