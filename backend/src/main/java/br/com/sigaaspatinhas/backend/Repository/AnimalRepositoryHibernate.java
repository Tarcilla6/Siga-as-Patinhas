package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class AnimalRepositoryHibernate implements AnimalRepository {

    private final AnimalJpaRepository jpa;

    public AnimalRepositoryHibernate(AnimalJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public AnimalModel salvar(AnimalModel animal) {
        return jpa.save(animal);
    }

    @Override
    public Optional<AnimalModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public List<AnimalModel> listarTodos() {
        return jpa.findAll();
    }

    @Override
    public void remover(UUID id) {
        jpa.deleteById(id);
    }
}