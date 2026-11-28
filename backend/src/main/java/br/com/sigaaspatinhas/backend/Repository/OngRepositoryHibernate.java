package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.OngModel;
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
public class OngRepositoryHibernate implements OngRepository {

    private final SessionFactory sessionFactory;

    public OngRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public OngModel salvar(OngModel ong) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                OngModel salva = ong;
                if (ong.getId() == null) {
                    sessao.persist(ong);
                } else {
                    salva = sessao.merge(ong);
                }
                transacao.commit();
                return salva;
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }

    @Override
    public Optional<OngModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(OngModel.class, id));
        }
    }

    @Override
    public List<OngModel> listarTudo() {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery("from OngModel", OngModel.class).list();
        }
    }

    @Override
    public List<OngModel> buscarPorNome(String nome) {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery(
                            "from OngModel o where lower(o.nome) like lower(:nome)",
                            OngModel.class)
                    .setParameter("nome", "%" + nome + "%")
                    .list();
        }
    }

    @Override
    public void remover(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                OngModel ong = sessao.find(OngModel.class, id);
                if (ong != null) {
                    sessao.remove(ong);
                }
                transacao.commit();
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }
}