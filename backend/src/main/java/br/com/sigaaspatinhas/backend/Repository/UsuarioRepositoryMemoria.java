package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.UsuarioModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("memoria")
public class UsuarioRepositoryMemoria implements UsuarioRepository{

    private final List<UsuarioModel> usuarios = new ArrayList<>();

    @Override
    public UsuarioModel salvar(UsuarioModel usuario) {

        if (usuario.getId() != null){
            Optional<UsuarioModel> usuarioExiste = buscarPorId(usuario.getId());

            if (usuarioExiste.isPresent()){
                usuarios.remove(usuarioExiste.get());
            }
        }
        usuarios.add(usuario);

        return usuario;
    }

    @Override
    public List<UsuarioModel> listarTodos() {
        return new ArrayList<>(usuarios);
    }

    @Override
    public Optional<UsuarioModel> buscarPorId(UUID id) {
        return usuarios.stream().filter(usuario -> usuario.getId() != null
                                        && usuario.getId().equals(id)).findFirst();
    }

    @Override
    public Optional<UsuarioModel> buscarPorEmail(String email) {
        return usuarios.stream().filter(usuario -> usuario.getEmail() != null
                                         && usuario.getEmail().equalsIgnoreCase(email)).findFirst();
    }

    @Override
    public boolean existePorEmail(String email) {
        return buscarPorEmail(email).isPresent();
    }

    @Override
    public void remover(UUID id) {
        usuarios.removeIf(usuario -> usuario.getId() != null
                && usuario.getId().equals(id));
    }
}
