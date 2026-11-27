package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.OngModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class OngRepositoryHibernate implements OngRepository{

    private final OngJpaRepository jpa;

    public OngRepositoryHibernate(OngJpaRepository jpa){
        this.jpa = jpa;
    }

    @Override
    public OngModel salvar(OngModel ong) {
        return jpa.save(ong);
    }

    @Override
    public List<OngModel> listarTudo() {
        return jpa.findAll();
    }

    @Override
    public Optional<OngModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public List<OngModel> buscarPorNome(String nome) {
        return jpa.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public void remover(UUID id) {
         jpa.deleteById(id);
    }
}
