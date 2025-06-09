package com.nlu.petstore.config;

import com.nlu.petstore.config.configHandler.CustomAccessDeniedHandler;
import com.nlu.petstore.config.configHandler.CustomAuthenticationEntryPoint;
import com.nlu.petstore.security.CustomOAuth2UserService;
import com.nlu.petstore.security.JwtAuthenticationFilter;
import com.nlu.petstore.security.OAuth2LoginFailureHandler;
import com.nlu.petstore.security.OAuth2LoginSuccessHandler;
import com.nlu.petstore.security.outh2.CustomAuthorizationRequestResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private  JwtAuthenticationFilter jwtAuthFilter;
    @Autowired
    private OAuth2LoginSuccessHandler  oAuth2LoginSuccessHandler;
    @Autowired
    private OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;
    @Autowired
    private CustomOAuth2UserService oAuth2UserService;
    @Autowired
    private CustomAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private CustomAccessDeniedHandler accessDeniedHandler;






    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        OAuth2AuthorizationRequestResolver customAuthorizationRequestResolver =
                new CustomAuthorizationRequestResolver(clientRegistrationRepository, "/oauth2/authorization");
        return httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/cart/**").permitAll()
                        .requestMatchers("/api/products","/api/categories"
                                ,"/api/auth/**","/api/**"
                                , "/oauth2/**").permitAll()
                        .requestMatchers("/api/auth/login", "/api/auth/register"
                                , "/api/auth/logout").permitAll()

                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/forgotPassword/**").permitAll()
                        .requestMatchers("/admin/**"
                                ,"/api/users","/api/roles"
                        ).hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                // Cấu hình xử lý khi người dùng không có quyền truy cập
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(authenticationEntryPoint) // Trả về lỗi 401 nếu không có quyền
                        .accessDeniedHandler(accessDeniedHandler)// 403
                )
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(endpoint -> endpoint
                                .authorizationRequestResolver(customAuthorizationRequestResolver)
                        )
                        .userInfoEndpoint(user -> user.userService(oAuth2UserService))
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler(oAuth2LoginFailureHandler)
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .build();

    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React frontend
                .allowedMethods("*");
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Cung cấp PasswordEncoder để mã hóa mật khẩu
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/"); // trỏ tới thư mục trong ổ đĩa
    }
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }


//    @Bean
//    public AuthenticationProvider authenticationProvider(){
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(userDetailsService);
//        provider.setPasswordEncoder(passwordEncoder());
//        return provider;
//    }
}
