package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;
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
public class ResponsavelRepositoryHibernate implements ResponsavelRepository {

    private final SessionFactory sessionFactory;

    public ResponsavelRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public ResponsavelModel salvar(ResponsavelModel responsavel) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                ResponsavelModel salvo = responsavel;
                if (responsavel.getId() == null) {
                    sessao.persist(responsavel);
                } else {
                    salvo = sessao.merge(responsavel);
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
    public Optional<ResponsavelModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(ResponsavelModel.class, id));
        }
    }

    @Override
    public List<ResponsavelModel> listarTodos() {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery("from ResponsavelModel", ResponsavelModel.class).list();
        }
    }

    @Override
    public List<ResponsavelModel> buscarPorNome(String nome) {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery(
                            "from ResponsavelModel r where lower(r.nome) like lower(:nome)",
                            ResponsavelModel.class)
                    .setParameter("nome", "%" + nome + "%")
                    .list();
        }
    }

    @Override
    public void remover(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                ResponsavelModel responsavel = sessao.find(ResponsavelModel.class, id);
                if (responsavel != null) {
                    sessao.remove(responsavel);
                }
                transacao.commit();
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }
}