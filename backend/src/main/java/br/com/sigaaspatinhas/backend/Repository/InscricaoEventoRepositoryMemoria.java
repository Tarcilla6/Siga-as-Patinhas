package br.com.sigaaspatinhas.backend.Repository;

import br.com.sigaaspatinhas.backend.Model.InscricaoEventoModel;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("memoria")
public class InscricaoEventoRepositoryMemoria implements InscricaoEventoRepository {

    private final List<InscricaoEventoModel> inscricoes = new ArrayList<>();

    @Override
    public InscricaoEventoModel salvar(InscricaoEventoModel inscricao) {

        if (inscricao.getId() != null) {
            Optional<InscricaoEventoModel> inscricaoExistente =
                    buscarPorId(inscricao.getId());

            if (inscricaoExistente.isPresent()) {
                inscricoes.remove(inscricaoExistente.get());
            }
        }

        inscricoes.add(inscricao);

        return inscricao;
    }

    @Override
    public Optional<InscricaoEventoModel> buscarPorId(UUID id) {
        return inscricoes.stream()
                .filter(inscricao -> inscricao.getId() != null
                        && inscricao.getId().equals(id))
                .findFirst();
    }

    @Override
    public List<InscricaoEventoModel> listarTodos() {
        return new ArrayList<>(inscricoes);
    }

    @Override
    public void remover(UUID id) {
        inscricoes.removeIf(inscricao -> inscricao.getId() != null
                && inscricao.getId().equals(id));
    }
}