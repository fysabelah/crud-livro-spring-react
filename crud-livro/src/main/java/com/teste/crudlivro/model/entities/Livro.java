package com.teste.crudlivro.model.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_livro")
public class Livro implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_livro")
    private Integer idLivro;

    @Column(name = "titulo")
    private String tituloLivro;

    @ManyToOne
    @JoinColumn(name = "id_autor")
    private Autor autor;

    public Livro() {

    }

    public Livro(Integer idLivro, String tituloLivro, Autor autor) {
        this.idLivro = idLivro;
        this.tituloLivro = tituloLivro;
        this.autor = autor;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getIdLivro() {
        return idLivro;
    }

    public void setIdLivro(Integer idLivro) {
        this.idLivro = idLivro;
    }

    public String getTituloLivro() {
        return tituloLivro;
    }

    public void setTituloLivro(String tituloLivro) {
        this.tituloLivro = tituloLivro;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }
}
