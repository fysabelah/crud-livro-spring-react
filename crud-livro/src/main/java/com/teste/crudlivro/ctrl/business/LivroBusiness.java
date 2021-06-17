package com.teste.crudlivro.ctrl.business;

import com.teste.crudlivro.ctrl.exceptions.LivroException;
import com.teste.crudlivro.model.entities.Livro;
import com.teste.crudlivro.model.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroBusiness {
    @Autowired
    private LivroRepository repository;

    public List<Livro> findAll(){
        return repository.findAll();
    }

    public Livro findById(Integer id) throws LivroException{
        Optional<Livro> retorno = repository.findById(id);

        if(retorno.isEmpty()){
            throw new LivroException("0200");
        }

        return retorno.get();
    }

    public Livro insert(Livro livro) throws LivroException{
        this.validarLivro(livro);
        return repository.save(livro);
    }

    public void validarLivro(Livro livro) throws LivroException{
        if(livro.getAutor() == null || livro.getTituloLivro() == null || livro.getTituloLivro() == " "){
            throw new LivroException("0201");
        }
    }

    public void delete(Integer id){
        repository.deleteById(id);
    }

    public Livro update(Livro livro) throws LivroException {
        this.validarLivro(livro);
        Livro livroUpdate = repository.findById(livro.getIdLivro()).get();

        livroUpdate.setTituloLivro(livro.getTituloLivro());
        livroUpdate.setAutor(livro.getAutor());

        return repository.save(livroUpdate);
    }
}
