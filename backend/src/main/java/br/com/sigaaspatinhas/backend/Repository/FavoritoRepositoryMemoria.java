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

    private final List<FavoritoModel> favoritos = new ArrayList<>();

    @Override
    public FavoritoModel salvar(FavoritoModel favorito) {

        if (favorito.getId() != null) {
            favoritos.removeIf(f -> f.getId() != null
                    && f.getId().equals(favorito.getId()));
        }

        favoritos.add(favorito);

        return favorito;
    }

    @Override
    public List<FavoritoModel> listarPorUsuario(UUID usuarioId) {
        return favoritos.stream()
                .filter(favorito -> favorito.getUsuario() != null
                        && favorito.getUsuario().getId() != null
                        && favorito.getUsuario().getId().equals(usuarioId))
                .toList();
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        return favoritos.stream()
                .anyMatch(favorito -> favorito.getUsuario() != null
                        && favorito.getAnimal() != null
                        && favorito.getUsuario().getId() != null
                        && favorito.getAnimal().getId() != null
                        && favorito.getUsuario().getId().equals(usuarioId)
                        && favorito.getAnimal().getId().equals(animalId));
    }

    @Override
    public void remover(UUID usuarioId) {
        favoritos.removeIf(favorito -> favorito.getUsuario() != null
                && favorito.getUsuario().getId() != null
                && favorito.getUsuario().getId().equals(usuarioId));
    }
}