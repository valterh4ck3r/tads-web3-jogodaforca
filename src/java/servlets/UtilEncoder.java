package servlets;

import javax.json.Json;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author paulo
 */
public class UtilEncoder implements Encoder.Text<PalavraMagica> {

    @Override
    public void init(final EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(final PalavraMagica palavra) throws EncodeException {
        return Json.createObjectBuilder()
                .add("palavraMagica", palavra.getPalavraMagica())
                .add("letra", palavra.getLetra() == null ? "" : palavra.getLetra())
                .build()
                .toString();
    }
}
