package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.FavoritoModel;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class FavoritoRepositoryHibernate implements FavoritoRepository {

    private final SessionFactory sessionFactory;

    public FavoritoRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public FavoritoModel salvar(FavoritoModel favorito) {
        try (Session session = sessionFactory.openSession()) {
            Transaction tx = session.beginTransaction();
            try {
                if (favorito.getId() == null) {
                    session.persist(favorito);
                } else {
                    favorito = session.merge(favorito);
                }
                tx.commit();
                return favorito;
            } catch (RuntimeException e) {
                tx.rollback();
                throw e;
            }
        }
    }

    @Override
    public List<FavoritoModel> listarPorUsuario(UUID usuarioId) {
        try (Session session = sessionFactory.openSession()) {
            return session.createQuery(
                            "from FavoritoModel f where f.usuario.id = :usuarioId",
                            FavoritoModel.class)
                    .setParameter("usuarioId", usuarioId)
                    .list();
        }
    }

    @Override
    public boolean existe(UUID usuarioId, UUID animalId) {
        try (Session session = sessionFactory.openSession()) {
            Long total = session.createQuery(
                            "select count(f) from FavoritoModel f "
                                    + "where f.usuario.id = :usuarioId and f.animal.id = :animalId",
                            Long.class)
                    .setParameter("usuarioId", usuarioId)
                    .setParameter("animalId", animalId)
                    .uniqueResult();
            return total != null && total > 0;
        }
    }

    @Override
    public void remover(UUID usuarioId) {
        try (Session session = sessionFactory.openSession()) {
            Transaction tx = session.beginTransaction();
            try {
                session.createMutationQuery(
                                "delete from FavoritoModel f where f.usuario.id = :usuarioId")
                        .setParameter("usuarioId", usuarioId)
                        .executeUpdate();
                tx.commit();
            } catch (RuntimeException e) {
                tx.rollback();
                throw e;
            }
        }
    }
}

