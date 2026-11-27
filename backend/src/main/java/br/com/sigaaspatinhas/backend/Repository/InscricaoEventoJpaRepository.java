package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;
import br.com.sigaaspatinhas.backend.Model.InscricaoEventoModel;
import  org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InscricaoEventoJpaRepository extends JpaRepository<InscricaoEventoModel, UUID> {
    List<InscricaoEventoModel> findByNomeContainingIgnoreCase(String nome);
}
