package br.com.sigaaspatinhas.backend.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "favoritos",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "animal_id"})
)
public class FavoritoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private UsuarioModel usuario;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private AnimalModel animal;

    private LocalDateTime criadoEm = LocalDateTime.now();

    public FavoritoModel() {}

    public FavoritoModel(UsuarioModel usuario, AnimalModel animal) {
        this.usuario = usuario;
        this.animal = animal;
    }

    public UUID getId() { return id; }
    public UsuarioModel getUsuario() { return usuario; }
    public AnimalModel getAnimal() { return animal; }
    public LocalDateTime getCriadoEm() { return criadoEm; }

}