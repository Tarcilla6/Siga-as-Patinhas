package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventoRepository {

    EventoModel salvar(EventoModel evento);

    Optional<EventoModel> buscarPorId(UUID id);

    List<EventoModel> listarTodos();

    List<EventoModel> listarPorNome(String titulo);

    void remover(UUID id);


}