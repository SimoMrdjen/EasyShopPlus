package Easy.Shop.Plus.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


    @Configuration
    public class CorsConfig {

        @Bean
        public CorsFilter corsFilter() {
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowCredentials(true); // You may not need this
            config.addAllowedOrigin("http://localhost:4200"); // Allow frontend server
            config.addAllowedHeader("*"); // Allow all headers
            config.addAllowedMethod("*"); // Allow all methods
            source.registerCorsConfiguration("/**", config);
            return new CorsFilter(source);
        }
    }


