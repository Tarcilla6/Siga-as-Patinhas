package br.com.sigaaspatinhas.backend.dto;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
import java.util.List;
import java.util.UUID;

public record AnimalPerfilResponse(
        UUID id,
        String nome,
        String especie,
        String sexo,
        int idadeMeses,
        String porte,
        boolean castrado,
        boolean vacinado,
        boolean conviveBemComCaes,
        String status,
        String bairro,
        String historia,
        List<String> temperamentos,
        List<String> fotos,
        ResponsavelResumo responsavel
) {
    public record ResponsavelResumo(UUID id, String nome, boolean verificado, int respondeEmHoras) {}

    // Converte a entidade (banco) no formato da tela
    public static AnimalPerfilResponse de(AnimalModel a) {
        var r = a.getResponsavel();
        return new AnimalPerfilResponse(
                a.getId(),
                a.getNome(),
                a.getEspecie(),
                a.getSexo().name(),
                a.getIdadeMeses(),
                a.getPorte().name(),
                a.isCastrado(),
                a.isVacinado(),
                a.isConviveBem(),
                a.getStatus().name(),
                a.getBairro(),
                a.getHistorico(),
                List.copyOf(a.getTemperamentos()),
                List.copyOf(a.getFotos()),
                new ResponsavelResumo(r.getId(), r.getNome(), r.isVerificado(), r.getRespondeEmHoras())
        );
    }
}