package com.pranav.onlinebankingsystem.repository;


import com.pranav.onlinebankingsystem.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Optional;
import com.pranav.onlinebankingsystem.entity.User;
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);
    Optional<Account> findByUser(User user);
}