var ws;
function logar() {
    var wsUri = "ws://" + document.location.host + document.location.pathname + "chat";
    ws = new WebSocket(wsUri);
    ws.binaryType = "arraybuffer";
    ws.onmessage = function(evt) {
        
    };
}
function init() {
    var form = document.forms[0];
    form.botao.onclick = logar;
}
onload = init;