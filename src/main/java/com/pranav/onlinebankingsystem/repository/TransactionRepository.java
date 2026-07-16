package com.pranav.onlinebankingsystem.repository;

import com.pranav.onlinebankingsystem.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findBySenderAccountAccountNumberOrReceiverAccountAccountNumberOrderByTransactionDateDesc(
            String senderAccount,
            String receiverAccount
    );

}