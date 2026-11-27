package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.OngModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OngJpaRepository extends JpaRepository<OngModel, UUID>{
    List<OngModel> findByNomeContainingIgnoreCase(String nome);
}
