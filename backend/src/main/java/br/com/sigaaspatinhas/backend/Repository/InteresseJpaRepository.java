package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InteresseModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InteresseJpaRepository extends JpaRepository<InteresseModel, UUID> {

    boolean existsByUsuarioIdAnimalId(UUID animalId, UUID usuarioId);

    List<InteresseModel> findByUsuarioId(UUID usuarioId);

    List<InteresseModel> findByAnimalId(UUID animalId);
}
