package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InscricaoEventoModel;
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
public class InscricaoEventoRepositoryHibernate implements InscricaoEventoRepository {

    private final SessionFactory sessionFactory;

    public InscricaoEventoRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public InscricaoEventoModel salvar(InscricaoEventoModel inscricao) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                InscricaoEventoModel salva = inscricao;
                if (inscricao.getId() == null) {
                    sessao.persist(inscricao);
                } else {
                    salva = sessao.merge(inscricao);
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
    public Optional<InscricaoEventoModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(InscricaoEventoModel.class, id));
        }
    }

    @Override
    public List<InscricaoEventoModel> listarTodos() {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery("from InscricaoEventoModel", InscricaoEventoModel.class).list();
        }
    }

    @Override
    public void remover(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                InscricaoEventoModel inscricao = sessao.find(InscricaoEventoModel.class, id);
                if (inscricao != null) {
                    sessao.remove(inscricao);
                }
                transacao.commit();
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }
}