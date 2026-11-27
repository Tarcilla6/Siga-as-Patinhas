package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InteresseModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("memoria")
public class InteresseRepositoryMemoria implements InteresseRepository {

    private final List<InteresseModel> interesses = new ArrayList<>();

    @Override
    public InteresseModel salvar(InteresseModel interesse) {

        if (interesse.getId() != null) {
            Optional<InteresseModel> interesseExistente =
                    buscarPorId(interesse.getId());

            if (interesseExistente.isPresent()) {
                interesses.remove(interesseExistente.get());
            }
        }

        interesses.add(interesse);

        return interesse;
    }

    @Override
    public Optional<InteresseModel> buscarPorId(UUID id) {
        return interesses.stream()
                .filter(interesse -> interesse.getId() != null
                        && interesse.getId().equals(id))
                .findFirst();
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        return interesses.stream()
                .anyMatch(interesse -> interesse.getUsuario() != null
                        && interesse.getAnimal() != null
                        && interesse.getUsuario().getId().equals(usuarioId)
                        && interesse.getAnimal().getId().equals(animalId));
    }

    @Override
    public List<InteresseModel> listarPorUsuario(UUID usuarioId) {
        return interesses.stream()
                .filter(interesse -> interesse.getUsuario() != null
                        && interesse.getUsuario().getId().equals(usuarioId))
                .toList();
    }

    @Override
    public List<InteresseModel> listarPorAnimal(UUID animalId) {
        return interesses.stream()
                .filter(interesse -> interesse.getAnimal() != null
                        && interesse.getAnimal().getId().equals(animalId))
                .toList();
    }
}