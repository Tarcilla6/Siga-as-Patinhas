package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.FavoritoModel;

import java.util.List;
import java.util.UUID;

public interface FavoritoRepository {

    FavoritoModel salvar(FavoritoModel favorito);

    List<FavoritoModel> listarPorUsuario(UUID usuarioId);

    boolean existe(UUID usuarioId, UUID animalId);

    void remover(UUID usuarioId);


}
