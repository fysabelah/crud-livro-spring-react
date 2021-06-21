package com.teste.crudlivro.ctrl.business;

import com.teste.crudlivro.ctrl.exceptions.AutorException;
import com.teste.crudlivro.model.entities.Autor;
import com.teste.crudlivro.model.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorBusiness {
    @Autowired
    private AutorRepository repository;

    public List<Autor> findAll(){
        return repository.findAll();
    }

    public Autor findById(Integer id) throws AutorException {
        Optional<Autor> retorno = repository.findById(id);

        if(retorno.isEmpty()){
            throw new AutorException("0100");
        }

        return retorno.get();
    }

    public Autor insert(Autor autor) throws AutorException {
        this.validarNome(autor);
        return repository.save(autor);
    }

    public void validarNome(Autor autor) throws AutorException{
        if (autor.getNmAutor() == null || autor.getNmAutor().trim().isEmpty())
            throw new AutorException("0101");
    }

    public void delete(Integer id){
        // busca livros com autor
        // se algum livro existe dispara BAD_REQUEST
        // senão, realmente deleta
        repository.deleteById(id);
    }

    public Autor update(Autor autor) throws AutorException {
        this.validarNome(autor);
        Autor autorUpdate = repository.findById(autor.getIdAutor()).get();
        autorUpdate.setNmAutor(autor.getNmAutor());
        return repository.save(autorUpdate);
    }
}
