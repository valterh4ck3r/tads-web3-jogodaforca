/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;
import java.util.Random;

/**
 *
 * @author Valter
 */
public class FileUtil {
      
    public String getPalavraMagica() throws IOException{  
        File file;
        
        String os = System.getProperty("os.name");

        if(os.toLowerCase().contains("windows")){
           file = new File("C:\\wordlist_pt_br.txt"); 
        } else {
           file = new File("/home/wordlist_pt_br.txt");  
        }
                
        
        BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile())); 
        
        String stream; 
        List<String> palavrasMagicas = new ArrayList<>();
        while ((stream = br.readLine()) != null){
          palavrasMagicas.add(stream);
        } 
        
        int index =  new Random().nextInt(palavrasMagicas.size());
    
        return palavrasMagicas.get(index);
    }
}
