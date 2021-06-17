package com.teste.crudlivro.ctrl;

import com.teste.crudlivro.ctrl.business.LivroBusiness;
import com.teste.crudlivro.ctrl.exceptions.LivroException;
import com.teste.crudlivro.model.entities.Livro;
import com.teste.crudlivro.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/livros")
public class LivroCtrl {
    @Autowired
    private LivroBusiness business;

    @GetMapping
    public ResponseEntity<List<Livro>> findAll(){
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        List<Livro> list = business.findAll();

        if(list.size() == 0){
            status = HttpStatus.NO_CONTENT;
            headers.add("message", Message.get("0202"));
        }

        return new ResponseEntity<List<Livro>>(list, headers, status);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Livro> findById(@PathVariable Integer id){
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        Livro retorno = new Livro();

        try{
            retorno = business.findById(id);
        }catch (LivroException e){
            headers.add("message", Message.get(e.getMessage()));
            status = HttpStatus.NO_CONTENT;
        }catch (Exception e){
            headers.add("message", Message.get("0001"));
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Livro>(retorno, headers, status);
    }

    @PostMapping
    public ResponseEntity<Livro> insert(@RequestBody Livro livro){
        HttpStatus status = HttpStatus.OK;
        HttpHeaders headers = new HttpHeaders();

        try{
            livro = business.insert(livro);
            headers.add("message", Message.get("0203"));
        }catch (LivroException e){
            status = HttpStatus.BAD_REQUEST;
            headers.add("message", Message.get(e.getMessage()));
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            headers.add("message", Message.get("0204"));
        }

        return new ResponseEntity<Livro>(livro, headers, status);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        try{
            business.delete(id);
            headers.add("message", Message.get("0205"));
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            headers.add("message", Message.get("0206"));
        }

        return new ResponseEntity<Void>(null, headers, status);
    }

    @PutMapping
    public ResponseEntity<Livro> update(@RequestBody Livro livro){
        HttpStatus status = HttpStatus.OK;
        HttpHeaders headers = new HttpHeaders();

        try{
            livro = business.update(livro);
            headers.add("message", Message.get("0207"));
        }catch (LivroException e){
            status = HttpStatus.BAD_REQUEST;
            headers.add("message", Message.get(e.getMessage()));
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            headers.add("message", Message.get("0208"));
        }

        return new ResponseEntity<Livro>(livro, headers, status);
    }
}
