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
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 *
 * @author Valter
 */
public class FileUtil {
      
    public static String getPalavraMagica() throws IOException{
        File file = new File("C:\\words.txt"); 
  
        BufferedReader br = new BufferedReader(new FileReader(file)); 
        
        String stream; 
        List<String> palavrasMagicas = new ArrayList<>();
        while ((stream = br.readLine()) != null){
          palavrasMagicas.add(stream);
        } 
        
        int index =  new Random().nextInt(palavrasMagicas.size());
    
        return palavrasMagicas.get(index);
    }
}
