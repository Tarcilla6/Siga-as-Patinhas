package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.EventoModel;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class EventoRepositoryHibernate implements EventoRepository {

    private final SessionFactory sessionFactory;

    public EventoRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public EventoModel salvar(EventoModel evento) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                EventoModel salvo = evento;
                if (evento.getId() == null) {
                    sessao.persist(evento);
                } else {
                    salvo = sessao.merge(evento);
                }
                transacao.commit();
                return salvo;
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }

    @Override
    public Optional<EventoModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(EventoModel.class, id));
        }
    }

    @Override
    public List<EventoModel> listarTodos() {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery("from EventoModel", EventoModel.class).list();
        }
    }

    @Override
    public List<EventoModel> listarPorNome(String nome) {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery(
                            "from EventoModel e "
                                    + "where lower(e.titulo) like lower(:nome)",
                            EventoModel.class)
                    .setParameter("nome", "%" + nome + "%")
                    .list();
        }
    }

    @Override
    public void remover(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                EventoModel evento = sessao.find(EventoModel.class, id);
                if (evento != null) {
                    sessao.remove(evento);
                }
                transacao.commit();
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }
}