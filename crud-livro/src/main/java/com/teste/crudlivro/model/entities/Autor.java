package com.teste.crudlivro.model.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_autor")
public class Autor implements Serializable {
    private static final long serialVersionUID = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_autor")
    private Integer idAutor;

    @Column(name = "nome_autor")
    private String nmAutor;

    public Autor() {

    }

    public Autor(Integer idAutor, String nmAutor) {
        this.idAutor = idAutor;
        this.nmAutor = nmAutor;
    }

    public Integer getIdAutor() {
        return idAutor;
    }

    public void setIdAutor(Integer idAutor) {
        this.idAutor = idAutor;
    }

    public String getNmAutor() {
        return nmAutor;
    }

    public void setNmAutor(String nmAutor) {
        this.nmAutor = nmAutor;
    }
}
