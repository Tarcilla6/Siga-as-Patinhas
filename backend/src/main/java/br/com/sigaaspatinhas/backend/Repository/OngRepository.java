package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.OngModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OngRepository {

    OngModel salvar(OngModel ong);

    List<OngModel> listarTudo();

    Optional<OngModel> buscarPorId(UUID id);

    Optional<OngModel> buscarPorNome(String nome);

    void remover(UUID id);
}
