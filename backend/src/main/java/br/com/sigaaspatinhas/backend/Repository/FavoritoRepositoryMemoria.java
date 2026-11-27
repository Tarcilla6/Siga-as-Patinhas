package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.FavoritoModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
@Profile("memoria")
public class FavoritoRepositoryMemoria implements FavoritoRepository {

    private final List<FavoritoModel> dados = new ArrayList<>();

    @Override
    public FavoritoModel salvar(FavoritoModel favorito) {
        if (favorito.getId() == null) {
            favorito.setId(UUID.randomUUID());
        }
        dados.removeIf(f -> f.getId().equals(favorito.getId())); // remove a versão antiga, se existir
        dados.add(favorito);
        return favorito;
    }

    @Override
    public List<FavoritoModel> listarPorUsuario(UUID usuarioId) {
        return dados.stream()
                .filter(f -> f.getUsuario().getId().equals(usuarioId))
                .toList();
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        return dados.stream()
                .anyMatch(f -> f.getUsuario().getId().equals(usuarioId)
                        && f.getAnimal().getId().equals(animalId));
    }

    @Override
    public void remover(UUID usuarioId) {
        dados.removeIf(f -> f.getUsuario().getId().equals(usuarioId));
    }
}