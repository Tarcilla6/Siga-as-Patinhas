package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("memoria")
public class EventoRepositoryMemoria implements EventoRepository {

    private final List<EventoModel> eventos = new ArrayList<>();

    @Override
    public EventoModel salvar(EventoModel evento) {

        Optional<EventoModel> eventoExistente = buscarPorId(evento.getId());

        if (eventoExistente.isPresent()) {
            eventos.remove(eventoExistente.get());
        }

        eventos.add(evento);

        return evento;
    }



    @Override
    public Optional<EventoModel> buscarPorId(UUID id) {
        return eventos.stream()
                .filter(evento -> evento.getId().equals(id))
                .findFirst();
    }

    @Override
    public List<EventoModel> listarTodos() {
        return new ArrayList<>(eventos);
    }

    @Override
    public List<EventoModel> listarPorNome(String titulo) {
        return eventos.stream()
                .filter(evento -> evento.getTitulo() != null
                        && evento.getTitulo().toLowerCase()
                        .contains(titulo.toLowerCase()))
                .toList();
    }

    @Override
    public void remover(UUID id) {
        eventos.removeIf(evento -> evento.getId().equals(id));
    }
}