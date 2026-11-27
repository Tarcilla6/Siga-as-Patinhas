package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoJpaRepository extends  JpaRepository<EventoRepositoryMemoria, Long>{
}
