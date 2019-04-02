var wsocket;
var serviceLocation = "ws://" + document.location.host + document.location.pathname + "jogodaforca/";
var room = '';
var palavraMagica = '';
var tentativas = 5;
var letrasAcertos = [];

function onMessageReceived(evt) {
    var objeto = JSON.parse(evt.data);    
    mountPalavraMagica(objeto);
}
function sendMessage(letra) {
    var formData = new FormData();
    formData.append("letra", letra);
    formData.append("palavraMagica", this.palavraMagica);
    
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    wsocket.send(json);
}

function connectToChatserver() {
    room = new Date().getTime().toString();
    wsocket = new WebSocket(serviceLocation + room);
    wsocket.onmessage = onMessageReceived;
    
}

function leaveRoom() {
    wsocket.close();
}

function mountPalavraMagica(objeto){
    $('#palavraMagicaEscondida').html(objeto.palavraMagica)
    $('#palavraMagica').html('')
    
    this.palavraMagica = objeto.palavraMagica;
    
    for(var index=0 ;index<this.palavraMagica.length; index++){
        if(objeto.letra === this.palavraMagica[index]){
            $('#palavraMagica').append(objeto.letra +" ")
        }
        $('#palavraMagica').append("_ ")
    }
    
}

$(document).ready(function () {
    connectToChatserver();
    
    $('#tentativas').html(tentativas);
            
    $('#sugerirLetra').click(function (evt) {
        evt.preventDefault();
        
        tentativas--;
        
        if(tentativas >= 1){                    
            var letra = $('#letra').val();
            sendMessage(letra);
            $('#letras-usadas').append(letra.toUpperCase() + " ")            
        } else {
            $('#sugerirLetra').addClass('disabled')
            $('#sugerirLetra').attr('disabled' , 'disabled')
            alert('Suas tentativas acabaram \n\nA palavra mágica é : ' + $('#palavraMagicaEscondida').html())
        }
        
        $('#tentativas').html(tentativas);

        $('#letra').val('');
    });
});
