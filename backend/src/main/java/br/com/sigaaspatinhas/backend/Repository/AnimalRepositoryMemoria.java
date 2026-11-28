package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("memoria")
public class AnimalRepositoryMemoria implements AnimalRepository {

    // Agora a chave do Map é UUID (antes era Long)
    private final Map<UUID, AnimalModel> dados = new HashMap<>();

    @Override
    public AnimalModel salvar(AnimalModel animal) {
        if (animal.getId() == null) {
            animal.setId(UUID.randomUUID());   // simula o que o Hibernate faria
        }
        dados.put(animal.getId(), animal);
        return animal;
    }

    @Override
    public Optional<AnimalModel> buscarPorId(UUID id) {
        return Optional.ofNullable(dados.get(id));
    }

    @Override
    public List<AnimalModel> listarTodos() {
        return new ArrayList<>(dados.values());
    }

    @Override
    public void remover(UUID id) {
        dados.remove(id);
    }


}