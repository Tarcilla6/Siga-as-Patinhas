package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UsuarioJpaRepository extends JpaRepository<UsuarioModel, UUID> {
}
