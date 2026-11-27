package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsavelJpaRepository extends JpaRepository<ResponsavelModel, Long> {
}
