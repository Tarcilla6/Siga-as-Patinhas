package br.com.sigaaspatinhas.backend.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "inscricoes_evento",
        uniqueConstraints = @UniqueConstraint(columnNames = {"evento_id", "usuario_id"})
)
public class InscricaoEventoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "evento_id")
    private EventoModel evento;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    private UsuarioModel usuario;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataInscricao;

    public InscricaoEventoModel() {}

    public InscricaoEventoModel(EventoModel evento, UsuarioModel usuario) {
        this.evento = evento;
        this.usuario = usuario;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public EventoModel getEvento() {
        return evento;
    }

    public void setEvento(EventoModel evento) {
        this.evento = evento;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getDataInscricao() {
        return dataInscricao;
    }

    public void setDataInscricao(LocalDateTime dataInscricao) {
        this.dataInscricao = dataInscricao;
    }
}
