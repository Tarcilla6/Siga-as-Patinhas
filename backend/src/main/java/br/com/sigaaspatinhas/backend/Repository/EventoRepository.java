package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventoRepository {

    EventoModel salvar(EventoModel evento);

    List<EventoModel> listarTodos();

    List<EventoModel> listarPorNome(String nome);

    Optional<EventoModel> buscarPorId(UUID id);

    void excluir(UUID id);
}
