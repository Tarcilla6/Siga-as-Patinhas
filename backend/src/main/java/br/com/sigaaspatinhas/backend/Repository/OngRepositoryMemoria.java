package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.OngModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("memoria")
public class OngRepositoryMemoria implements OngRepository {

    private final List<OngModel> ongs = new ArrayList<>();

    @Override
    public OngModel salvar(OngModel ong) {

        if (ong.getId() != null) {
            Optional<OngModel> ongExistente = buscarPorId(ong.getId());

            if (ongExistente.isPresent()) {
                ongs.remove(ongExistente.get());
            }
        }

        ongs.add(ong);

        return ong;
    }

    @Override
    public List<OngModel> listarTudo() {
        return new ArrayList<>(ongs);
    }

    @Override
    public Optional<OngModel> buscarPorId(UUID id) {
        return ongs.stream().filter(ong -> ong.getId() != null
                                     && ong.getId().equals(id)).findFirst();
    }

    @Override
    public List<OngModel> buscarPorNome(String nome) {
        return ongs.stream().filter(ong -> ong.getNome() != null
                                     && ong.getNome().toLowerCase().contains(nome.toLowerCase())).toList();
    }

    @Override
    public void remover(UUID id) {
        ongs.removeIf(ong -> ong.getId() != null
                && ong.getId().equals(id));
    }
}