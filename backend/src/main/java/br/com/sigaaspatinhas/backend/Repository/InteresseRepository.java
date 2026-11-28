package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InteresseModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InteresseRepository {

    InteresseModel salvar(InteresseModel interesse);

    Optional<InteresseModel> buscarPorId(UUID id);

    boolean existe(UUID usuarioId, UUID animalId);

    List<InteresseModel> listarPorUsuario(UUID usuarioId);

    List<InteresseModel> listarPorAnimal(UUID animalId);
}
