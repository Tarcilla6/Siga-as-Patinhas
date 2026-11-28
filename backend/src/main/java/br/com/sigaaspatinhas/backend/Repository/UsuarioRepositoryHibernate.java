package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.UsuarioModel;
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
public class UsuarioRepositoryHibernate implements UsuarioRepository {

    private final SessionFactory sessionFactory;

    public UsuarioRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public UsuarioModel salvar(UsuarioModel usuario) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                UsuarioModel salvo = usuario;
                if (usuario.getId() == null) {
                    sessao.persist(usuario);          // INSERT
                } else {
                    salvo = sessao.merge(usuario);    // UPDATE
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
    public Optional<UsuarioModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(UsuarioModel.class, id));
        }
    }

    @Override
    public Optional<UsuarioModel> buscarPorEmail(String email) {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery(
                            "from UsuarioModel u where u.email = :email",
                            UsuarioModel.class)
                    .setParameter("email", email)
                    .uniqueResultOptional();
        }
    }

    @Override
    public boolean existePorEmail(String email) {
        return buscarPorEmail(email).isPresent();
    }

    @Override
    public List<UsuarioModel> listarTodos() {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery("from UsuarioModel", UsuarioModel.class).list();
        }
    }

    @Override
    public void remover(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                UsuarioModel usuario = sessao.find(UsuarioModel.class, id);
                if (usuario != null) {
                    sessao.remove(usuario);           // DELETE
                }
                transacao.commit();
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }
}