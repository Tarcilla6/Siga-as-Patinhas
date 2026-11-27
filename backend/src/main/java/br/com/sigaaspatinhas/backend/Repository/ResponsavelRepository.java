package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponsavelRepository {

    ResponsavelModel salvar(ResponsavelModel responsavel);

    List<ResponsavelModel> listarTodos();

    Optional<ResponsavelModel> buscarPorId(UUID id);

    Optional<ResponsavelModel> buscarPorNome(String nome);

    void remover(UUID id);
}
