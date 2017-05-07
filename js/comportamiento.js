
// Funcion que comprueba si todos los puestos estan ocupados

var comprobarPuestos = function(){
    setTimeout(function(){

        if(($( "#punto_vigilancia").attr("contador") > 0) && ($( "#punto_supervision").attr("contador") > 0)){
            document.getElementsByClassName("txtPanelDeMensajes")[1].innerHTML="Todos los puestos estan ocupados";
        }
        else {
            document.getElementsByClassName("txtPanelDeMensajes")[1].innerHTML="";
        }
    }, 600);
};

// Función que comprueba si todas las puertas estan cerradas

var todasPuertasCerradas = function(){
    setTimeout(function(){

        if($( ".pVentas .ui-slider-range").css("height").match(/\d+/)[0] < 5  && $(".ppInterior").css("display") == "block" && $(".ppAlmacen").css("display")=="block" && $(".ppAlmacen").css("opacity")=="1"){
            document.getElementsByClassName("txtPanelDeMensajes")[0].innerHTML="Todas las puertas estan cerradas";
        }
        else {
            document.getElementsByClassName("txtPanelDeMensajes")[0].innerHTML="";
        }
    }, 600);
};

// Llamamos a la función una primera vez nada mas arrancar la pagina para que salga el mensaje
// por pantalla ya que todas las puertas estan inicialmente cerradas.
todasPuertasCerradas();


$(function() {
    //tabs
    $( function() {
        $(".tabs").tabs();
    } );
    //accordion
    $("#accordion").accordion({
        header: "> div > h3",
        collapsible: true,
        active: false
    });
    //Draggables
    $( "#supervisor" ).draggable({
        containment : "#centro_comercial",
        start: function(){
            if((this.classList).contains("enCentro")== false){
                $("#acordeonInviSupervisor").append(this);
                console.log("entra");
                this.className += " enCentro";
                this.style.display="table !important";
            }
            else{
                console.log("no entra");
            }
        },
    });
    $( ".vigilante" ).draggable({
        appendTo: '#centro_comercial',
        start: function(){
            if((this.classList).contains("enCentro")== false){
                $("#acordeonInviVigi").append(this);
                console.log("entra");
                this.className += " enCentro";
                this.style.display="table !important";
            }
            else{
                console.log("no entra");
            }
        }
    });
    $( "#lista_departamentos" ).draggable({
        revert: "valid"
    });
    $( ".panelPuertas" ).draggable({
    });

    // Droppables

    $( "#centro_comercial" ).droppable({

    });
    $( "#punto_vigilancia" ).droppable({
        tolerance: 'fit',
        over: function(event, ui)
        {
            // Comprobamos que el elemento es el vigilante.
            if (ui.draggable.attr('class') != null && ui.draggable.attr('class').includes('vigilante')){
                // Incrementamos en uno el contador  de vigilantes vigilando ya que despues comprobaremos que todos los vigilantes
                // esten fuera para volver a poner el puesto de vigilancia a rojo (Solo incrementaremos si el vigilante no estaba vigilando).
                if ($(ui.draggable).attr('vigilando') == "no"){
                    var incrementoContador = parseInt($(this).attr('contador')) + 1;
                    $(this).attr('contador', incrementoContador);
                }

                comprobarPuestos();

                // Ponemos el puesto de vigilancia a verde ya que tenemos vigilantes dentro.
                $(this).css("background-color", "#ffa0a0");

                // Indicamos el vigilante esta vigilando.
                $(ui.draggable).attr('vigilando', 'si');
            }
        },
        out: function(event, ui)
        {
            // Comprobamos que el elemento es el vigilante.
            if ((ui.draggable.attr('class') != null) && (ui.draggable.attr('class').includes('vigilante'))){
                if($(this).attr('contador') == 1){
                    $(this).css("background-color", "red");
                }

                comprobarPuestos();

                // Decrementamos en uno el contador ya que despues comprobaremos que todos los vigilantes esten fuera
                // para volver a poner el puesto de vigilancia a rojo.
                var incrementoContador = parseInt($(this).attr('contador')) - 1;
                $(this).attr('contador', incrementoContador);

                // Indicamos el vigilante no esta vigilando.
                $(ui.draggable).attr('vigilando', 'no');
            }
        }
    });
    $( "#punto_supervision" ).droppable({
        tolerance: 'fit',
        over: function(event, ui)
        {
            // Comprobamos que el elemento es el supervisor y si es asi ponemos el puesto de supervision
            // a verde ya que tenemos al supervisor dentro.
            if (ui.draggable.attr('id') != null && ui.draggable.attr('id').includes('supervisor')){
                $(this).css("background-color", "#ffa0a0");
            }

            $(this).attr('contador', 1);

            comprobarPuestos();
        },
        out: function(event, ui)
        {
            // Comprobamos que el elemento es el supervisor y si es asi ponemos el puesto de supervision
            // a rojo ya que el supervisor ha dejado de supervisar.
            if (ui.draggable.attr('id') != null && ui.draggable.attr('id').includes('supervisor')){
                $(this).css("background-color", "red");
            }

            $(this).attr('contador', 0);

            comprobarPuestos();
        }
    });
    $( function() {
        $( ".pVentas" ).slider({
            orientation: "vertical",
            range: "min",
            animate: "slow",
            min: 0,
            max: 100,
            value: 0, slide: function( event, ui ) {
                todasPuertasCerradas();
            }
        });
        $(".pInterior").click(function(){
            if($(".ppInterior").css("display")!="none"){
                $(".ppInterior").hide();}
            else{
                $(".ppInterior").show();

            }
            todasPuertasCerradas();
        });
        var stoped= false;
        $(".pAlmacen").click(function(){
            if($(".ppAlmacen").css("opacity")== 0||$(".ppAlmacen").css("opacity")== 1 || stoped==true){
                if($(".ppAlmacen").css("display")!="none"){
                    $(".ppAlmacen").fadeOut(2000);}
                else{
                    $(".ppAlmacen").fadeIn(2000);
                }
                todasPuertasCerradas();
                stoped=false}
            else{
                $(".ppAlmacen").stop();
                stoped=true;
            }
        });
    } );

    //Sortable
    $(function() {
        $( "#departamentos" ).sortable();
    });

    //Menu
    $(function() {
        $( "#panel_Puertas" ).menu();
    });
});