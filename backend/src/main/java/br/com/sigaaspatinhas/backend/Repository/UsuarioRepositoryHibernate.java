package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.UsuarioModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("!memoria")
public class UsuarioRepositoryHibernate implements UsuarioRepository{

    private final UsuarioJpaRepository jpa;

    public UsuarioRepositoryHibernate(UsuarioJpaRepository jpa){
        this.jpa = jpa;
    }

    @Override
    public UsuarioModel salvar(UsuarioModel usuario) {
        return jpa.save(usuario);
    }

    @Override
    public List<UsuarioModel> listarTodos() {
        return jpa.findAll();
    }

    @Override
    public Optional<UsuarioModel> buscarPorId(UUID id) {
        return jpa.findById(id);
    }

    @Override
    public void excluir(UUID id) {
        jpa.deleteById(id);
    }
}
