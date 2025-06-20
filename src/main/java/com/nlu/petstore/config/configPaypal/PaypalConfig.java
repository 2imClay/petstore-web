package com.nlu.petstore.config.configPaypal;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;


@Configuration
public class PaypalConfig {

    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.mode}")
    private String mode; // "sandbox" or "live"

    @Bean
    public Map<String,String> payPalSDKConfig(){
        Map<String,String> config = new HashMap<String,String>();
        config.put("mode", mode);
        return config;
    }

    @Bean
    public OAuthTokenCredential oAuthTokenCredential(){
        return new OAuthTokenCredential(clientId, clientSecret, payPalSDKConfig());
    }

    @Bean
    public APIContext apiContext() {
        return new APIContext(clientId, clientSecret, mode) ;
    }
}
