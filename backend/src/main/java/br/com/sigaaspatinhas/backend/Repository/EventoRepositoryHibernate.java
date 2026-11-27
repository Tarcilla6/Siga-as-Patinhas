package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class EventoRepositoryHibernate implements EventoRepository {

    private final EventoJpaRepository repository;

    public EventoRepositoryHibernate(EventoJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public EventoModel salvar(EventoModel evento) {
        return repository.save(evento);
    }

    @Override
    public List<EventoModel> listarTodos() {
        return repository.findAll();
    }

    @Override
    public List<EventoModel> listarPorNome(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public Optional<EventoModel> buscarPorId(UUID id) {
        return repository.findById(id);
    }

    @Override
    public void excluir(UUID id) {
        repository.deleteById(id);
    }
}