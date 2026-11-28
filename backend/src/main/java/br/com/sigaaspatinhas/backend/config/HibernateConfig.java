package br.com.sigaaspatinhas.backend.config;

import br.com.sigaaspatinhas.backend.Model.AnimalModel;
import br.com.sigaaspatinhas.backend.Model.EventoModel;
import br.com.sigaaspatinhas.backend.Model.FavoritoModel;
import br.com.sigaaspatinhas.backend.Model.InscricaoEventoModel;
import br.com.sigaaspatinhas.backend.Model.InteresseModel;
import br.com.sigaaspatinhas.backend.Model.OngModel;
import br.com.sigaaspatinhas.backend.Model.ResponsavelModel;
import br.com.sigaaspatinhas.backend.Model.UsuarioModel;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HibernateConfig {

    @Bean(destroyMethod = "close")
    public SessionFactory sessionFactory() {

        org.hibernate.cfg.Configuration cfg = new org.hibernate.cfg.Configuration();

        // Conexão com o SQLite
        cfg.setProperty("hibernate.connection.driver_class", "org.sqlite.JDBC");
        cfg.setProperty("hibernate.connection.url", "jdbc:sqlite:sigaaspatinhas.db");
        cfg.setProperty("hibernate.dialect", "org.hibernate.community.dialect.SQLiteDialect");

        // SQLite aceita uma escrita por vez
        cfg.setProperty("hibernate.connection.pool_size", "1");

        // Cria/atualiza as tabelas na inicialização
        cfg.setProperty("hibernate.hbm2ddl.auto", "update");

        // Mostra o SQL no console
        cfg.setProperty("hibernate.show_sql", "true");

        // Registre TODAS as entidades aqui
        cfg.addAnnotatedClass(UsuarioModel.class);
        cfg.addAnnotatedClass(AnimalModel.class);
        cfg.addAnnotatedClass(ResponsavelModel.class);
        cfg.addAnnotatedClass(OngModel.class);
        cfg.addAnnotatedClass(EventoModel.class);
        cfg.addAnnotatedClass(InscricaoEventoModel.class);
        cfg.addAnnotatedClass(FavoritoModel.class);
        cfg.addAnnotatedClass(InteresseModel.class);

        return cfg.buildSessionFactory();
    }
}