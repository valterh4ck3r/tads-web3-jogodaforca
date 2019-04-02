package servlets;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.websocket.EncodeException;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import util.FileUtil;

@ServerEndpoint(value = "/jogodaforca/{room}", encoders = UtilEncoder.class, decoders = UtilDecoder.class)
public class WebSocket {

    private final Logger log = Logger.getLogger(getClass().getName());

    @OnOpen
    public void open(final Session session, @PathParam("room") final String room) throws IOException, EncodeException {
        PalavraMagica palavraMagica = new PalavraMagica(new FileUtil().getPalavraMagica());
        session.getUserProperties().put("room", room);
        session.getBasicRemote().sendObject(palavraMagica);
    }

    @OnMessage
    public void onMessage(final Session session, final PalavraMagica palavraMagica) {
        String room = (String) session.getUserProperties().get("room");
        try {
            for (Session s : session.getOpenSessions()) {
                if (s.isOpen()
                        && room.equals(s.getUserProperties().get("room"))) {
                    s.getBasicRemote().sendObject(palavraMagica);
                }
            }
        } catch (IOException | EncodeException e) {
            log.log(Level.WARNING, "onMessage failed", e);
        }
    }
}
