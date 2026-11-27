package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.OngModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OngJpaRepository extends JpaRepository<OngModel, Long>{
}
