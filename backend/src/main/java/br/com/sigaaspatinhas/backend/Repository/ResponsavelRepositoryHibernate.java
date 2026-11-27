package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class ResponsavelRepositoryHibernate implements  ResponsavelRepository{

    private final ResponsavelJpaRepository jpa;

    public ResponsavelRepositoryHibernate(ResponsavelJpaRepository jpa){
        this.jpa = jpa;
    }

    @Override
    public ResponsavelModel salvar(ResponsavelModel responsavel) {
        return jpa.save(responsavel);
    }

    @Override
    public List<ResponsavelModel> listarTodos() {
        return jpa.findAll();
    }

    @Override
    public Optional<ResponsavelModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public List<ResponsavelModel> buscarPorNome(String nome) {
        return jpa.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public void remover(UUID id) {
        jpa.deleteById(id);
    }
}
