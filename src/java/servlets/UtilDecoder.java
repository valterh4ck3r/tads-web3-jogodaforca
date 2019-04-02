package servlets;

import java.io.StringReader;
import java.util.Date;
import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author paulo
 */
public class UtilDecoder implements Decoder.Text<PalavraMagica> {

    @Override
    public void init(final EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public PalavraMagica decode(final String textMessage) throws DecodeException {
        PalavraMagica palavra = new PalavraMagica();
        JsonObject obj = Json.createReader(new StringReader(textMessage))
                .readObject();
        palavra.setPalavraMagica(obj.getString("palavraMagica"));
        palavra.setLetra(obj.getString("letra"));
        return palavra;
    }

    @Override
    public boolean willDecode(final String s) {
        return true;
    }
}
