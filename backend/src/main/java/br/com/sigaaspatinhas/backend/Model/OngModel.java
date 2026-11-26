package br.com.sigaaspatinhas.backend.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ongs")
public class OngModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @Column(nullable = false)
    private String nome; // nome oficial ou nome fantasia

    @Column(nullable = false, unique = true, length = 14)
    private String cnpj; // só os 14 dígitos, sem máscara

    private String registro; // nº de registro municipal/estadual

    @Column(nullable = false)
    private String responsavelLegal;

    @Column(nullable = false)
    private String email; // e-mail institucional

    private String telefone;
    private String endereco;

    @Column(length = 2000)
    private String descricao;

    // Ata, estatuto ou registro: guardamos só o caminho/URL do PDF
    private String documentoUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusValidacao statusValidacao = StatusValidacao.PENDENTE;

    private boolean ativa = true;

    // Usuário (perfil ONG) que fez o cadastro e representa a organização
    @ManyToOne
    @JoinColumn(name = "representante_id")
    private UsuarioModel representante;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCadastro;

    public OngModel() {}

    public OngModel(String nome, String cnpj, String responsavelLegal, String email) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.responsavelLegal = responsavelLegal;
        this.email = email;
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

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRegistro() {
        return registro;
    }

    public void setRegistro(String registro) {
        this.registro = registro;
    }

    public String getResponsavelLegal() {
        return responsavelLegal;
    }

    public void setResponsavelLegal(String responsavelLegal) {
        this.responsavelLegal = responsavelLegal;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDocumentoUrl() {
        return documentoUrl;
    }

    public void setDocumentoUrl(String documentoUrl) {
        this.documentoUrl = documentoUrl;
    }

    public StatusValidacao getStatusValidacao() {
        return statusValidacao;
    }

    public void setStatusValidacao(StatusValidacao statusValidacao) {
        this.statusValidacao = statusValidacao;
    }

    public boolean isAtiva() {
        return ativa;
    }

    public void setAtiva(boolean ativa) {
        this.ativa = ativa;
    }

    public UsuarioModel getRepresentante() {
        return representante;
    }

    public void setRepresentante(UsuarioModel representante) {
        this.representante = representante;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}