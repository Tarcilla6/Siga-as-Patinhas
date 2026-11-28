package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InscricaoEventoModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InscricaoEventoRepository {

    InscricaoEventoModel salvar( InscricaoEventoModel inscricao);

    List<InscricaoEventoModel> listarTodos();

    Optional<InscricaoEventoModel> buscarPorId(UUID id);

    void remover(UUID id);
}
