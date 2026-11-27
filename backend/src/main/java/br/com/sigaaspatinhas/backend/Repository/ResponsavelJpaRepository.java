package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ResponsavelJpaRepository extends JpaRepository<ResponsavelModel, UUID> {
}
