package Easy.Shop.Plus.security.config;


//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.authentication.logout.LogoutHandler;
//
//
//import static Kiss.Miss.Backend.security.user.Role.ADMIN;
//import static Kiss.Miss.Backend.security.user.Role.USER;
//
//
//@Configuration
//@RequiredArgsConstructor
//@EnableMethodSecurity
//@EnableWebSecurity//(debug = true)
//
//public class SecurityConfiguration {
//
//    private final JwtAuthenticationFilter jwtAuthFilter;
//    private final AuthenticationProvider authenticationProvider;
//    private final LogoutHandler logoutHandler;
//    private final CorsConfig corsConfig;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf()
//                .disable()
//                .cors()
//                .and()
//                .authorizeHttpRequests()
////                .requestMatchers(
////                        "/", "/static/favicon.ico", "/static/index.html",
////                        "/static/**", "/manifest.json", "/APV.png", "/logo192.png")
//                .requestMatchers(
//                        "/**", "/favicon.ico", "/index.html", "/static/**", "/manifest.json", "/APV.png", "/logo192.png"
//                )
//                .permitAll()
//                .requestMatchers(
//                        "/api/auth/**",
//                        "/login"
////                        "/v2/api-docs",
////                        "/v3/api-docs",
////                        "/v3/api-docs/**",
////                        "/swagger-resources",
////                        "/swagger-resources/**",
////                        "/configuration/ui",
////                        "/configuration/security",
////                        "/swagger-ui/**",
////                        "/webjars/**",
////                        "/swagger-ui.html"
////                        "/", "/static/**", "/index.html", "/favicon.ico",
////                        "/manifest.json", "/APV.png", "/logo192.png"
//                )
//                .permitAll()
//
//
//                .requestMatchers("/api/review/**").hasAnyRole(ADMIN.name(), USER.name())
//
//                .requestMatchers("/api/users/**").hasRole(ADMIN.name())
//                .anyRequest()
//                .authenticated()
//
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
////                .formLogin()
////                .loginPage("/login") // Specify the URL of your login page
////                .permitAll() // Allow access to the login page for everyone
////                .and()
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class)  //TODO comment this for bundling
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
//                .logout()
//                .logoutUrl("/api/auth/logout")
//                .addLogoutHandler(logoutHandler)
//                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
//        ;
//        return http.build();
//    }
//}

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static Easy.Shop.Plus.security.user.Role.ADMIN;
import static Easy.Shop.Plus.security.user.Role.USER;


@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
   private final CorsConfig corsConfig;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .authorizeHttpRequests()
//                .requestMatchers(
//                        "/", "/static/favicon.ico", "/static/index.html",
//                        "/static/**", "/manifest.json", "/APV.png", "/logo192.png")
                .requestMatchers(
                        "/**", "/favicon.ico", "/index.html", "/static/**", "/manifest.json", "/APV.png", "/logo192.png"
                )
                .permitAll()
                .requestMatchers(
                        "/api/auth/**",
                        "/login"
//                        "/v2/api-docs",
//                        "/v3/api-docs",
//                        "/v3/api-docs/**",
//                        "/swagger-resources",
//                        "/swagger-resources/**",
//                        "/configuration/ui",
//                        "/configuration/security",
//                        "/swagger-ui/**",
//                        "/webjars/**",
//                        "/swagger-ui.html"
//                        "/", "/static/**", "/index.html", "/favicon.ico",
//                        "/manifest.json", "/APV.png", "/logo192.png"
                )
                .permitAll()

                .requestMatchers("/api/review/**").hasAnyRole(ADMIN.name(), USER.name())
                .requestMatchers("/api/invoice/**").hasAnyRole(ADMIN.name(), USER.name())
//                .requestMatchers("/api/obrazac_io/**").hasAnyRole(ADMIN.name(), USER.name())
//                .requestMatchers("/api/zakljucni_list/**").hasAnyRole(ADMIN.name(), USER.name())
    //            .requestMatchers("/api/review/**").hasAnyRole(ADMIN.name(), USER.name())

                .requestMatchers("/api/users/**").hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

//                .formLogin()
//                .loginPage("/login") // Specify the URL of your login page
//                .permitAll() // Allow access to the login page for everyone
//                .and()

                .authenticationProvider(authenticationProvider)
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class)  //TODO comment this for bundling
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;
        return http.build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
////                .cors(cors -> cors.configurationSource(request -> {
////                    CorsConfiguration config = new CorsConfiguration();
////                    config.setAllowCredentials(true);
////                    config.addAllowedOrigin("http://localhost:4200");
////                    config.addAllowedHeader("*");
////                    config.addAllowedMethod("*");
////                    return config;
////                }))
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(
//                                "/**", "/favicon.ico", "/index.html", "/static/**",
//                                "/manifest.json", "/APV.png", "/logo192.png")
//                        .permitAll()
//                        .requestMatchers("/api/auth/**", "/login")
//                        .permitAll()
//                        .requestMatchers("/api/review/**").hasAnyRole("ADMIN", "USER")
//                        .requestMatchers("/api/users/**").hasRole("ADMIN")
//                        .anyRequest().authenticated()
//                )
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/**").permitAll()  // Update this as needed for your security policy
//                        .anyRequest().authenticated()
//                )
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//                .logout(logout -> logout
//                        .logoutUrl("/api/auth/logout")
//                        .addLogoutHandler(logoutHandler)
//                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
//                )
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }


}
