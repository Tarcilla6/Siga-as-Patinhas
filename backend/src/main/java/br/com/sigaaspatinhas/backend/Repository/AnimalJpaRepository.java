package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnimalJpaRepository extends JpaRepository<AnimalModel, UUID> {
}
