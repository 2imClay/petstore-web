package com.nlu.petstore.repository;

import com.nlu.petstore.entity.ForgotPassword;
import com.nlu.petstore.entity.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword,Integer> {

    @Query("select fp from ForgotPassword fp where fp.otp =?1 and fp.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);
    @Transactional
    @Modifying
    @Query("delete from ForgotPassword fp where fp.user = ?1")
    void deleteAllByUser(User user);
}
