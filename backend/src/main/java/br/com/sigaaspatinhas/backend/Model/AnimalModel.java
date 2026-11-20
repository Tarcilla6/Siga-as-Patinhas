package br.com.sigaaspatinhas.backend.Model;

import jakarta.persistence.*;
import org.hibernate.Length;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.*;

@Entity
@Table(name = "animais")
public class AnimalModel{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @Column(nullable = false)
    private String nome;
    private String especie;
    private int idadeMeses;
    private boolean castrado;
    private boolean vacinado;
    private boolean conviveBem;
    private String bairro;

    @Column(length = 2000)
    private String historico;


    @Enumerated(EnumType.STRING)
    private StatusAnimal status = StatusAnimal.DISPONIVEL;
    @Enumerated(EnumType.STRING)
    private Sexo sexo;
    @Enumerated(EnumType.STRING)
    private Porte porte;

    // tags: "Carinhosa", "Sociavel"
    @ElementCollection
    @CollectionTable(name = "animal_temperamentos", joinColumns = @JoinColumn(name = "animal_id"))
    @Column(name = "temperamento")
    private Set<String> temperamentos = new LinkedHashSet<>();

    // Fotos: guardamos só a URL/caminho da imagem, nunca a imagem dentro do banco
    @ElementCollection
    @CollectionTable(name = "animal_fotos", joinColumns = @JoinColumn(name = "animal_id"))
    @Column(name = "url")
    @OrderColumn(name = "posicao")             // mantém a ordem (a 1ª é a foto principal)
    private List<String> fotos = new ArrayList<>();

    // Muitos animais -> um responsável

    @ManyToOne(optional = false)
    @JoinColumn(name = "responsavel_id")
    private  ResponsavelModel responsavel;

    // getters e setters


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

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public int getIdadeMeses() {
        return idadeMeses;
    }

    public void setIdadeMeses(int idadeMeses) {
        this.idadeMeses = idadeMeses;
    }

    public boolean isCastrado() {
        return castrado;
    }

    public void setCastrado(boolean castrado) {
        this.castrado = castrado;
    }

    public boolean isVacinado() {
        return vacinado;
    }

    public void setVacinado(boolean vacinado) {
        this.vacinado = vacinado;
    }

    public boolean isConviveBem() {
        return conviveBem;
    }

    public void setConviveBem(boolean conviveBem) {
        this.conviveBem = conviveBem;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getHistorico() {
        return historico;
    }

    public void setHistorico(String historico) {
        this.historico = historico;
    }

    public StatusAnimal getStatus() {
        return status;
    }

    public void setStatus(StatusAnimal status) {
        this.status = status;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public Porte getPorte() {
        return porte;
    }

    public void setPorte(Porte porte) {
        this.porte = porte;
    }

    public Set<String> getTemperamentos() {
        return temperamentos;
    }

    public void setTemperamentos(Set<String> temperamentos) {
        this.temperamentos = temperamentos;
    }

    public List<String> getFotos() {
        return fotos;
    }

    public void setFotos(List<String> fotos) {
        this.fotos = fotos;
    }

    public ResponsavelModel getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(ResponsavelModel responsavel) {
        this.responsavel = responsavel;
    }
}
