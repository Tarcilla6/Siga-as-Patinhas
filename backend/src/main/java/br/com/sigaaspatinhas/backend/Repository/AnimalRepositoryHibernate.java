package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
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
public class AnimalRepositoryHibernate implements AnimalRepository {

    private final SessionFactory sessionFactory;

    public AnimalRepositoryHibernate(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public AnimalModel salvar(AnimalModel animal) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                if (animal.getId() == null) {
                    sessao.persist(animal);          // INSERT
                } else {
                    animal = sessao.merge(animal);   // UPDATE
                }
                transacao.commit();
                return animal;
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }

    @Override
    public Optional<AnimalModel> buscarPorId(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            return Optional.ofNullable(sessao.find(AnimalModel.class, id));
        }
    }

    @Override
    public List<AnimalModel> listarTodos() {
        try (Session sessao = sessionFactory.openSession()) {
            return sessao.createQuery("from AnimalModel", AnimalModel.class).list();
        }
    }

    @Override
    public void remover(UUID id) {
        try (Session sessao = sessionFactory.openSession()) {
            Transaction transacao = sessao.beginTransaction();
            try {
                AnimalModel animal = sessao.find(AnimalModel.class, id);
                if (animal != null) {
                    sessao.remove(animal);           // DELETE
                }
                transacao.commit();
            } catch (RuntimeException erro) {
                transacao.rollback();
                throw erro;
            }
        }
    }
}