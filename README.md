<div align="center">

<!-- Salve a imagem de capa em docs/assets/capa.png para ela aparecer aqui -->
<img src="docs/assets/capa.png" alt="Siga as Patinhas - Mobile Prototype Presentation" width="720"/>

<br/>

# 🐾 SIGA AS PATINHAS

### *Rastrear para cuidar: gestão pública e inclusiva de animais em situação de rua.*

<br/>

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-FFD27F?style=for-the-badge&labelColor=6B2410)
![Projeto](https://img.shields.io/badge/projeto-acad%C3%AAmico-A9C8EE?style=for-the-badge&labelColor=6B2410)
![Curso](https://img.shields.io/badge/curso-ADS-D9B99B?style=for-the-badge&labelColor=6B2410)

![React](https://img.shields.io/badge/React-FDF6EC?style=flat-square&logo=react&logoColor=6B2410)
![Vite](https://img.shields.io/badge/Vite-FDF6EC?style=flat-square&logo=vite&logoColor=6B2410)
![TypeScript](https://img.shields.io/badge/TypeScript-FDF6EC?style=flat-square&logo=typescript&logoColor=6B2410)
![Java](https://img.shields.io/badge/Java-FDF6EC?style=flat-square&logo=openjdk&logoColor=6B2410)
![Figma](https://img.shields.io/badge/Figma-FDF6EC?style=flat-square&logo=figma&logoColor=6B2410)

[Sobre](#-sobre-o-projeto) •
[Problema](#-o-problema) •
[Funcionalidades](#-funcionalidades) •
[Arquitetura](#-modelagem-do-sistema) •
[Tecnologias](#-tecnologias-e-ferramentas) •
[Equipe](#-equipe) •
[Planejamento](#-planejamento)

</div>

---

## 📌 Sobre o projeto

O **Siga as Patinhas** é uma plataforma digital criada para facilitar a **identificação, o acompanhamento e a proteção** de animais em situação de vulnerabilidade.

A proposta é **conectar cidadãos, ONGs, cuidadores e órgãos públicos**, promovendo uma gestão mais organizada, transparente e eficiente das informações relacionadas aos animais.

> 🧡 *Cada patinha registrada é um passo a mais rumo a um cuidado de verdade.*

---

## 🚨 O problema

Animais em situação de rua enfrentam diariamente:

- 🐶 **Abandono** e falta de um lar;
- 💉 **Ausência de cuidados veterinários**, como vacinação e castração;
- 🔎 **Dificuldade de identificação** e de acompanhamento ao longo do tempo;
- 🗂️ **Informações dispersas**, que dificultam o trabalho de quem atua na proteção animal.

## 🎯 Objetivo

Desenvolver uma plataforma que facilite o **registro e o acompanhamento dos animais**, reunindo informações importantes em um único lugar e aproximando a população dos serviços de proteção animal.

---

## 👥 Público-alvo

| | Perfil | Como a plataforma ajuda |
|:-:|---|---|
| 🙋 | **Cidadãos** | Registrar animais, denunciar maus-tratos e adotar |
| 🏠 | **ONGs e instituições** | Gerenciar animais e divulgar ações |
| 💛 | **Cuidadores e protetores independentes** | Acompanhar o histórico e os cuidados de cada animal |
| 🏛️ | **Órgãos públicos** | Obter dados organizados para uma gestão eficiente |

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔐 **Cadastro e login** | Acesso seguro dos usuários à plataforma |
| 🏷️ **Identificação dos animais** | Registro de informações para reconhecimento e acompanhamento |
| 🔔 **Notificações** | Comunicação de informações importantes |
| 📋 **Histórico do animal** | Vacinação, castração e outros cuidados |
| 🐕 **Adoção** | Cadastro, consulta e busca de animais disponíveis |
| 📢 **Denúncias** | Registro de situações de abandono e maus-tratos |
| 📰 **Eventos e notícias** | Divulgação de ações e conteúdos sobre proteção animal |
| 💬 **Suporte** | Perguntas frequentes e canais de contato |

---

## 🧩 Modelagem do sistema



## 🛠️ Modelagem do sistema

### 📊 Diagrama de Classes

O diagrama abaixo representa a estrutura principal do sistema **Siga as Patinhas**, apresentando as entidades, seus atributos, enumerações e os relacionamentos entre elas.

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#FDF6EC',
  'primaryBorderColor':'#6B2410',
  'primaryTextColor':'#6B2410',
  'lineColor':'#C9A27E',
  'secondaryColor':'#FFD98A',
  'tertiaryColor':'#B9D4F5'
}}}%%
classDiagram
    direction TB

    class Usuario {
        -UUID id
        -String nome
        -String email
        -String senhaHash
        -String telefone
        -String cpf
        -LocalDate dataNascimento
        -String cidade
        -String fotoUrl
        -Perfil perfil
        -Boolean ativo
        -LocalDateTime dataCadastro
    }

    class ONG {
        -UUID id
        -String nome
        -String cnpj
        -String email
        -String telefone
        -String endereco
        -String descricao
        -StatusValidacao statusValidacao
        -LocalDate dataCadastro
    }

    class Responsavel {
        -UUID id
        -String cpf
        -String endereco
        -LocalDate dataCadastro
    }

    class Animal {
        -UUID id
        -String nome
        -String especie
        -Sexo sexo
        -Porte porte
        -Integer idadeMeses
        -Boolean castrado
        -Boolean vacinado
        -Boolean conviveBemComCaes
        -StatusAnimal status
        -String bairro
        -String historia
        -Set~String~ temperamentos
        -List~String~ fotos
    }

    class Evento {
        -UUID id
        -String titulo
        -String descricao
        -TipoEvento tipo
        -LocalDateTime dataHora
        -String local
    }

    class Favorito {
        -UUID id
        -LocalDateTime criadoEm
    }

    class Interesse {
        -UUID id
        -LocalDateTime criadoEm
        -StatusInteresse status
        -String mensagem
    }

    class InscricaoEvento {
        -UUID id
        -LocalDateTime dataInscricao
    }

    class Perfil {
        <<enumeration>>
        CIDADAO
    }

    class StatusValidacao {
        <<enumeration>>
    }

    class StatusAnimal {
        <<enumeration>>
        DISPONIVEL
        EM_PROCESSO
        ADOTADO
    }

    class StatusInteresse {
        <<enumeration>>
        PENDENTE
        EM_CONVERSA
        APROVADO
        RECUSADO
    }

    class Porte {
        <<enumeration>>
        PEQUENO
        MEDIO
        GRANDE
    }

    class Sexo {
        <<enumeration>>
        MACHO
        FEMEA
    }

    class TipoEvento {
        <<enumeration>>
    }

    Usuario "1" --> "0..1" Responsavel : possui perfil
    Usuario "1" --> "0..*" Animal : cadastra
    ONG "1" --> "0..*" Animal : gerencia
    Responsavel "0..1" --> "0..*" Animal : responsavel atual
    ONG "1" --> "0..*" Evento : organiza

    Usuario "1" --> "0..*" Favorito : favorita
    Animal "1" --> "0..*" Favorito : recebe favoritos

    Usuario "1" --> "0..*" Interesse : demonstra
    Animal "1" --> "0..*" Interesse : recebe interesses

    Usuario "1" --> "0..*" InscricaoEvento : se inscreve
    Evento "1" --> "0..*" InscricaoEvento : recebe inscricoes

    Usuario ..> Perfil
    ONG ..> StatusValidacao
    Animal ..> StatusAnimal
    Animal ..> Porte
    Animal ..> Sexo
    Interesse ..> StatusInteresse
    Evento ..> TipoEvento

    classDef entidade fill:#FDF6EC,stroke:#6B2410,stroke-width:2px,color:#6B2410
    classDef intermediaria fill:#FFD98A,stroke:#6B2410,stroke-width:2px,color:#6B2410
    classDef enumeracao fill:#B9D4F5,stroke:#6B2410,stroke-width:1px,color:#6B2410

    class Usuario entidade
    class ONG entidade
    class Responsavel entidade
    class Animal entidade
    class Evento entidade

    class Favorito intermediaria
    class Interesse intermediaria
    class InscricaoEvento intermediaria

    class Perfil enumeracao
    class StatusValidacao enumeracao
    class StatusAnimal enumeracao
    class StatusInteresse enumeracao
    class Porte enumeracao
    class Sexo enumeracao
    class TipoEvento enumeracao
```

### 🎨 Legenda

| Cor | Representação |
|---|---|
| 🟫 Creme | Entidades principais do sistema |
| 🟨 Amarelo | Entidades/tabelas intermediárias utilizadas nos relacionamentos |
| 🟦 Azul | Enumerações (Enums) |

### 🔗 Relacionamentos

- **Usuário e Responsável:** um usuário pode possuir um perfil de responsável.
- **Usuário e Animal:** um usuário pode cadastrar vários animais.
- **ONG e Animal:** uma ONG pode gerenciar vários animais.
- **Responsável e Animal:** um responsável pode estar associado aos animais sob sua responsabilidade.
- **ONG e Evento:** uma ONG pode organizar vários eventos.
- **Usuário e Favorito:** um usuário pode favoritar vários animais.
- **Animal e Favorito:** um animal pode receber vários favoritos.
- **Usuário e Interesse:** um usuário pode demonstrar interesse em vários animais.
- **Animal e Interesse:** um animal pode receber vários registros de interesse.
- **Usuário e Inscrição em Evento:** um usuário pode se inscrever em vários eventos.
- **Evento e Inscrição:** um evento pode receber várias inscrições.

---

## 🛠️ Tecnologias e ferramentas

| Categoria | Ferramentas |
|---|---|
| 🎨 **Frontend** | React · Vite · TypeScript |
| ⚙️ **Backend** | Java |
| 💻 **IDEs** | Eclipse · IntelliJ IDEA · VS Code |
| 🔀 **Versionamento** | Git · GitHub |
| 📌 **Organização** | Trello |
| 🖌️ **Prototipação** | Figma |

---

## 👩‍💻 Equipe

<table>
  <tr>
    <th align="center">🎨 UX / Documentação</th>
    <th align="center">🖥️ Frontend</th>
    <th align="center">🧠 Backend</th>
  </tr>
  <tr>
    <td align="center">
      Tarcilla Maria<br/>
      Bruna Francisca<br/>
      Antônio Henrique
    </td>
    <td align="center">
      Luísa Geórgia<br/>
      Mayara Eduarda<br/>
      Maria Gabriella
    </td>
    <td align="center">
      Kamyla Vitória<br/>
      Thamires Vitória<br/>
      Thais Vitória
    </td>
  </tr>
  <tr>
    <td align="center"><sub>Documentação, organização das informações e revisão da interface e da experiência do usuário.</sub></td>
    <td align="center"><sub>Desenvolvimento das telas e da interface da plataforma.</sub></td>
    <td align="center"><sub>Desenvolvimento do backend, gerenciamento de dados e regras de negócio.</sub></td>
  </tr>
</table>

---

## 📅 Planejamento

O projeto está organizado em **cinco semanas**, contemplando:

`Planejamento` → `Desenvolvimento` → `Integração` → `Testes` → `Entrega`

## 📦 Entregas esperadas

- ✅ Plataforma digital **Siga as Patinhas**;
- ✅ Interface com as funcionalidades propostas;
- ✅ Sistema de registro e acompanhamento dos animais;
- ✅ Documentação do projeto.

## 🌱 Impacto esperado

Contribuir para a proteção animal por meio da tecnologia, facilitando o acesso às informações, incentivando a participação da população e apoiando o trabalho de instituições e órgãos responsáveis.

---

<div align="center">

🐾 *Projeto acadêmico, Análise e Desenvolvimento de Sistemas* 🐾

Feito com 🧡 por quem acredita que todo bichinho merece cuidado.

</div>
