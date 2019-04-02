/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.util.Date;

/**
 *
 * @author paulo
 */
public class PalavraMagica {

    private String palavraMagica;
    private String letra;
    
    PalavraMagica(){}

    PalavraMagica(String palavraMagica) {
        this.palavraMagica = palavraMagica;
    }

    public String getPalavraMagica() {
        return palavraMagica;
    }

    public void setPalavraMagica(String palavraMagica) {
        this.palavraMagica = palavraMagica;
    }

    public String getLetra() {
        return letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

}
