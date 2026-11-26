package br.com.sigaaspatinhas.backend.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "eventos")
public class EventoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @Column(nullable = false)
    private String titulo;

    @Column(length = 2000)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEvento tipo;

    // Data e hora juntas; o DTO quebra em "12 OUT" e "10h — 16h" para a tela
    @Column(nullable = false)
    private LocalDateTime inicio;
    private LocalDateTime fim; // opcional (ex.: mutirão sem horário de término)

    @Column(nullable = false)
    private String local;

    // Total de vagas. As vagas restantes são calculadas no Service:
    // vagasTotais - quantidade de inscrições do evento
    private int vagasTotais;

    private boolean gratuito = true;
    private boolean destaque;
    private String imagemUrl;

    // Quem organiza (pode ser nulo, ex.: evento da prefeitura)
    @ManyToOne
    @JoinColumn(name = "ong_id")
    private OngModel ong;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCadastro;

    public EventoModel() {}

    public EventoModel(String titulo, TipoEvento tipo, LocalDateTime inicio, String local, int vagasTotais) {
        this.titulo = titulo;
        this.tipo = tipo;
        this.inicio = inicio;
        this.local = local;
        this.vagasTotais = vagasTotais;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoEvento getTipo() {
        return tipo;
    }

    public void setTipo(TipoEvento tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getInicio() {
        return inicio;
    }

    public void setInicio(LocalDateTime inicio) {
        this.inicio = inicio;
    }

    public LocalDateTime getFim() {
        return fim;
    }

    public void setFim(LocalDateTime fim) {
        this.fim = fim;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public int getVagasTotais() {
        return vagasTotais;
    }

    public void setVagasTotais(int vagasTotais) {
        this.vagasTotais = vagasTotais;
    }

    public boolean isGratuito() {
        return gratuito;
    }

    public void setGratuito(boolean gratuito) {
        this.gratuito = gratuito;
    }

    public boolean isDestaque() {
        return destaque;
    }

    public void setDestaque(boolean destaque) {
        this.destaque = destaque;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public OngModel getOng() {
        return ong;
    }

    public void setOng(OngModel ong) {
        this.ong = ong;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}
