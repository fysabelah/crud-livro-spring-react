package com.teste.crudlivro.model.repository;

import com.teste.crudlivro.model.entities.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Integer> {

}
