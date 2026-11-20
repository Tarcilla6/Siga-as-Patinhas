package br.com.sigaaspatinhas.backend.Model;

import  jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.UUID;

@Entity
@Table(name = "responsaveis") //nome da tabela
public class ResponsavelModel {

    @Id // chave primaria na tabela
    @GeneratedValue(strategy = GenerationType.UUID)  // o Hibernate gera o UUID ao salvar
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @Column(nullable = false )
    private String nome; // nome da org ou responsavel
    private boolean verificado;
    private int respondeEmHoras; // 24 => responde ate em um dia

    public ResponsavelModel () {}

    public  ResponsavelModel( String nome, boolean verificado, int respondeEmHoras){
        this.nome = nome;
        this.verificado = verificado;
        this.respondeEmHoras = respondeEmHoras;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public boolean isVerificado() {
        return verificado;
    }

    public void setVerificado(boolean verificado) {
        this.verificado = verificado;
    }

    public int getRespondeEmHoras() {
        return respondeEmHoras;
    }

    public void setRespondeEmHoras(int respondeEmHoras) {
        this.respondeEmHoras = respondeEmHoras;
    }
}
