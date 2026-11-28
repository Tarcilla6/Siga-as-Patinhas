package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.FavoritoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FavoritoJpaRepository extends JpaRepository<FavoritoModel, UUID> {

    boolean existsByUsuarioIdAnimalId(UUID usuarioId, UUID animalId);

    void deleteByUsuarioIdAnimalId(UUID usuarioId, UUID animalId);

    List<FavoritoModel> findByUsuarioId(UUID usuarioId);

}
