package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class EventoRepositoryHibernate implements EventoRepository {

    private final EventoJpaRepository jpa;

    public EventoRepositoryHibernate(EventoJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public EventoModel salvar(EventoModel evento) {
        return jpa.save(evento);
    }

    @Override
    public Optional<EventoModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public List<EventoModel> listarTodos() {
        return jpa.findAll();
    }

    @Override
    public List<EventoModel> listarPorNome(String titulo) {
        return jpa.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public void remover(UUID id) {
        jpa.deleteById(id);
    }

}