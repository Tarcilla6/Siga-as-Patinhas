
package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@Profile("memoria")
public class ResponsavelRepositoryMemoria implements ResponsavelRepository {

    private final List<ResponsavelModel> responsaveis = new ArrayList<>();

    @Override
    public ResponsavelModel salvar(ResponsavelModel responsavel) {

        if (responsavel.getId() != null) {
            Optional<ResponsavelModel> responsavelExiste =
                    buscarPorId(responsavel.getId());

            if (responsavelExiste.isPresent()) {
                responsaveis.remove(responsavelExiste.get());
            }
        }

        responsaveis.add(responsavel);

        return responsavel;
    }

    @Override
    public List<ResponsavelModel> listarTodos() {
        return new ArrayList<>(responsaveis);
    }

    @Override
    public Optional<ResponsavelModel> buscarPorId(UUID id) {
        return responsaveis.stream().filter(responsavel -> responsavel.getId() != null
                        && responsavel.getId().equals(id)).findFirst();
    }

    @Override
    public List<ResponsavelModel> buscarPorNome(String nome) {
        return responsaveis.stream().filter(responsavel -> responsavel.getNome() != null
                                             && responsavel.getNome().toLowerCase().contains(nome.toLowerCase())).toList();
    }

    @Override
    public void remover(UUID id) {
        responsaveis.removeIf(responsavel -> responsavel.getId() != null
                               && responsavel.getId().equals(id));
    }
}
