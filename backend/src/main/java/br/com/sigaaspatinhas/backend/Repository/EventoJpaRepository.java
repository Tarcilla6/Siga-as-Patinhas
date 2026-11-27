package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventoJpaRepository extends JpaRepository<EventoRepositoryMemoria, UUID> {
    List<EventoModel> findByNomeContainingIgnoreCase(String nome);
}
