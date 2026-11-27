package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InteresseModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memeoria")
public class InteresseRepositoryHibernate implements InteresseRepository{

    private final InteresseJpaRepository jpa;

    public InteresseRepositoryHibernate(InteresseJpaRepository jpa){
        this.jpa = jpa;
    }

    @Override
    public InteresseModel salvar(InteresseModel interesse) {
        return jpa.save(interesse);
    }

    @Override
    public Optional<InteresseModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        return jpa.existsByUsuarioIdAnimalId(usuarioId, animalId);
    }

    @Override
    public List<InteresseModel> listarPorUsuario(UUID usuarioId) {
        return jpa.findByUsuarioId(usuarioId);
    }

    @Override
    public List<InteresseModel> listarPorAnimal(UUID animalId) {
        return jpa.findByAnimalId(animalId);
    }
}
