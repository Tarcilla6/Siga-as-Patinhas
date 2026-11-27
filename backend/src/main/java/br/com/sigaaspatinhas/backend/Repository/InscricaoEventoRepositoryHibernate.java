package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InscricaoEventoModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class InscricaoEventoRepositoryHibernate implements InscricaoEventoRepository{

    private final InscricaoEventoJpaRepository jpa;

    public InscricaoEventoRepositoryHibernate(InscricaoEventoJpaRepository jpa){
        this.jpa = jpa;
    }

    @Override
    public InscricaoEventoModel salvar(InscricaoEventoModel inscricao) {
        return jpa.save(inscricao);
    }

    @Override
    public List<InscricaoEventoModel> listarTodos() {
        return jpa.findAll();
    }

    @Override
    public Optional<InscricaoEventoModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public void remover(UUID id) {
        jpa.deleteById(id);
    }
}
