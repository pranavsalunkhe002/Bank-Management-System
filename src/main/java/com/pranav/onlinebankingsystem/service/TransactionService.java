package com.pranav.onlinebankingsystem.service;

import com.pranav.onlinebankingsystem.dto.MiniStatementResponse;
import com.pranav.onlinebankingsystem.entity.Transaction;
import com.pranav.onlinebankingsystem.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pranav.onlinebankingsystem.dto.MiniStatementResponse;
import com.pranav.onlinebankingsystem.entity.Transaction;

import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<MiniStatementResponse> getMiniStatement(String accountNumber) {

        List<Transaction> transactions =
                transactionRepository
                        .findBySenderAccountAccountNumberOrReceiverAccountAccountNumberOrderByTransactionDateDesc(
                                accountNumber,
                                accountNumber
                        );

        return transactions.stream()
                .limit(5)
                .map(transaction -> new MiniStatementResponse(
                        transaction.getTransactionDate(),
                        transaction.getTransactionType(),
                        transaction.getAmount(),
                        transaction.getStatus(),
                        transaction.getSenderAccount() != null
                                ? transaction.getSenderAccount().getAccountNumber()
                                : "-",
                        transaction.getReceiverAccount() != null
                                ? transaction.getReceiverAccount().getAccountNumber()
                                : "-"
                ))
                .toList();
    }
    public List<MiniStatementResponse> getTransactionHistory(String accountNumber) {

        List<Transaction> transactions =
                transactionRepository
                        .findBySenderAccountAccountNumberOrReceiverAccountAccountNumberOrderByTransactionDateDesc(
                                accountNumber,
                                accountNumber
                        );

        return transactions.stream()
                .map(transaction -> new MiniStatementResponse(
                        transaction.getTransactionDate(),
                        transaction.getTransactionType(),
                        transaction.getAmount(),
                        transaction.getStatus(),
                        transaction.getSenderAccount() != null
                                ? transaction.getSenderAccount().getAccountNumber()
                                : "-",
                        transaction.getReceiverAccount() != null
                                ? transaction.getReceiverAccount().getAccountNumber()
                                : "-"
                ))
                .toList();
    }
}