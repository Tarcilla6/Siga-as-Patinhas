package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InteresseModel;
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
public class InteresseRepositoryHibernate implements InteresseRepository {

    private final SessionFactory sessionFactory;

    public InteresseRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public InteresseModel salvar(InteresseModel interesse) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                InteresseModel salvo = interesse;
                if (interesse.getId() == null) {
                    sessao.persist(interesse);           // INSERT
                } else {
                    salvo = sessao.merge(interesse);     // UPDATE
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
    public Optional<InteresseModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(InteresseModel.class, id));
        }
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        try (Session sessao = sessionFactory.openSession()) {
            Long total = sessao.createQuery(
                            "select count(i) from InteresseModel i "
                                    + "where i.usuario.id = :usuarioId "
                                    + "and i.animal.id = :animalId",
                            Long.class)
                    .setParameter("usuarioId", usuarioId)
                    .setParameter("animalId", animalId)
                    .uniqueResult();
            return total != null && total > 0;
        }
    }

    @Override
    public List<InteresseModel> listarPorUsuario(UUID usuarioId) {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery(
                            "from InteresseModel i where i.usuario.id = :usuarioId",
                            InteresseModel.class)
                    .setParameter("usuarioId", usuarioId)
                    .list();
        }
    }

    @Override
    public List<InteresseModel> listarPorAnimal(UUID animalId) {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery(
                            "from InteresseModel i where i.animal.id = :animalId",
                            InteresseModel.class)
                    .setParameter("animalId", animalId)
                    .list();
        }
    }
}