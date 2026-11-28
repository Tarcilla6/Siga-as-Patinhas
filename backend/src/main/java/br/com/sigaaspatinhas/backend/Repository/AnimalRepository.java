package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalRepository {

    AnimalModel salvar(AnimalModel animal);

    Optional<AnimalModel> buscarPorId(UUID id);

    List<AnimalModel> listarTodos();

    void remover(UUID id);


}
