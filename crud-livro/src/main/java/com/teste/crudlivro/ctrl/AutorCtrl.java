package com.teste.crudlivro.ctrl;

import com.teste.crudlivro.ctrl.business.AutorBusiness;
import com.teste.crudlivro.ctrl.exceptions.AutorException;
import com.teste.crudlivro.model.entities.Autor;
import com.teste.crudlivro.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/autores")
public class AutorCtrl {
    @Autowired
    private AutorBusiness business;

    @GetMapping
    public ResponseEntity<List<Autor>> findAll(){
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        List<Autor> list = business.findAll();

        if(list.size() == 0){
            status = HttpStatus.NO_CONTENT;
            headers.add("message", Message.get("0102"));
        }

        return new ResponseEntity<List<Autor>>(list, headers, status);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Autor> findById(@PathVariable Integer id){
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        Autor retorno = new Autor();

        try{
            retorno = business.findById(id);
        }catch (AutorException e){
            headers.add("message", Message.get(e.getMessage()));
            status = HttpStatus.NO_CONTENT;
        }catch (Exception e){
            headers.add("message", Message.get("0001"));
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Autor>(retorno, headers, status);
    }

    @PostMapping
    public ResponseEntity<Autor> insert(@RequestBody Autor autor){
        HttpStatus status = HttpStatus.OK;
        HttpHeaders headers = new HttpHeaders();

        try{
            autor = business.insert(autor);
            headers.add("message", Message.get("0103"));
        }catch (AutorException e){
            status = HttpStatus.BAD_REQUEST;
            headers.add("message", Message.get(e.getMessage()));
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            headers.add("message", Message.get("0104"));
        }

        return new ResponseEntity<Autor>(autor, headers, status);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        HttpStatus status = HttpStatus.OK;
        HttpHeaders headers = new HttpHeaders();

        try{
            business.delete(id);
            headers.add("message", Message.get("0105"));
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            headers.add("message", Message.get("0106"));
        }

        return new ResponseEntity<Void>(null, headers, status);
    }

    @PutMapping
    public ResponseEntity<Autor> update(@RequestBody Autor autor){
        HttpStatus status = HttpStatus.OK;
        HttpHeaders headers = new HttpHeaders();

        try{
            autor = business.update(autor);
            headers.add("message", Message.get("0107"));
        }catch (AutorException e){
            status = HttpStatus.BAD_REQUEST;
            headers.add("message", Message.get(e.getMessage()));
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            headers.add("message", Message.get("0108"));
        }

        return new ResponseEntity<Autor>(autor, headers, status);
    }
}
