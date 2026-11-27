package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.UsuarioModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository {

    UsuarioModel salvar(UsuarioModel usuario);

    List<UsuarioModel> listarTodos();

    Optional<UsuarioModel> buscarPorId(UUID id);

    void excluir(UUID id);
}
