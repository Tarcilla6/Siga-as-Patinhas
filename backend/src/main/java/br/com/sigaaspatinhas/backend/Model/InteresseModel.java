package br.com.sigaaspatinhas.backend.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "interesses",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "animal_id"})
)

public class InteresseModel {

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

    // Dados extras: o motivo de usar entidade própria
    @Column(nullable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private StatusValidacao status = StatusValidacao.PENDENTE;

    @Column(length = 500)
    private String mensagem;

    public InteresseModel() {}

    public InteresseModel(UsuarioModel usuario, AnimalModel animal, String mensagem) {
        this.usuario = usuario;
        this.animal = animal;
        this.mensagem = mensagem;
    }

    public UUID getId() { return id; }
    public UsuarioModel getUsuario() { return usuario; }
    public AnimalModel getAnimal() { return animal; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public StatusValidacao getStatus() { return status; }
    public void setStatus(StatusValidacao status) { this.status = status; }
    public String getMensagem() { return mensagem; }
}