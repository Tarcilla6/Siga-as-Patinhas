package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.FavoritoModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class FavoritoRepositoryHibernate implements FavoritoRepository{

    private final FavoritoJpaRepository jpa;

    public FavoritoRepositoryHibernate(FavoritoJpaRepository jpa){
        this.jpa = jpa;
    }

    @Override
    public FavoritoModel salvar(FavoritoModel favorito) {
        return jpa.save(favorito);
    }

    @Override
    public List<FavoritoModel> listarPorUsuario(UUID usuarioId) {
        return jpa.findByUsuarioId(usuarioId);
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        return jpa.existsByUsuarioIdAnimalId(usuarioId, animalId);
    }

    @Override
    public void remover(UUID usuarioId) {
        jpa.deleteById(usuarioId);
    }
}


