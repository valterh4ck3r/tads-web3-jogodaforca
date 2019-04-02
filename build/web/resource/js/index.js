var wsocket;
var serviceLocation = "ws://" + document.location.host + document.location.pathname + "jogodaforca/";
var room = '';
var palavraMagica = '';
var tentativas = 5;
var letrasUsadas = []
var firstLoad = true;
var conseguiu = false;

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
    var palavraMagicaTemp = $('#palavraMagica').html()
    $('#palavraMagica').html('')
    
    this.palavraMagica = objeto.palavraMagica;
    
    for(var index=0 ;index<this.palavraMagica.length; index++){
        if(objeto.letra === this.palavraMagica[index]){
            $('#palavraMagica').append(this.palavraMagica[index] +" ")
        } else {
            if(firstLoad){
                $('#palavraMagica').append("_ ")
            } else {
                var addLetra = false;
                for(var letra=0 ;letra<letrasUsadas.length; letra++){
                    if(this.letrasUsadas[letra] == this.palavraMagica[index]){
                        $('#palavraMagica').append(this.letrasUsadas[letra] +" ")
                        addLetra = false;
                        break;
                    } else {
                        addLetra = true;
                    }
                } 
                
                if(addLetra){
                    $('#palavraMagica').append("_ ")
                }
            }
            
        }  
        
    }   
   
    firstLoad = false;
    
    if(!$('#palavraMagica').html().includes("_")){
        $('#sugerirLetra').addClass('disabled')
        $('#sugerirLetra').attr('disabled' , 'disabled')
        alert('Parabéns, você conseguiu \n\nA palavra mágica é : ' + $('#palavraMagicaEscondida').html())
        conseguiu = true;
        return;
    }
        
}

$(document).ready(function () {
    $('#tentativas').html(tentativas);
    connectToChatserver();
                
    $('#sugerirLetra').click(function (evt) {
        evt.preventDefault();
        
        var letra = $('#letra').val();       
        
        if(letra !== ""){
            $('#letras-usadas').append(letra.toUpperCase() + " ")
            letrasUsadas.push(letra.toUpperCase())           
            
            if(tentativas >= 0){                   
                sendMessage(letra);         
            }

            $('#letra').val('');
            tentativas--;
            $('#tentativas').html(tentativas);
            if(tentativas == 0 && !conseguiu){
                $('#sugerirLetra').addClass('disabled')
                $('#sugerirLetra').attr('disabled' , 'disabled')
                alert('Suas tentativas acabaram \n\nA palavra mágica é : ' + $('#palavraMagicaEscondida').html())
            }
            
        } else {
            alert('Você deve digitar uma letra')
        }        

    });
});

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}