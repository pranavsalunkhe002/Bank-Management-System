package com.pranav.onlinebankingsystem.service;

import com.pranav.onlinebankingsystem.dto.AccountRequest;
import com.pranav.onlinebankingsystem.dto.DepositRequest;
import com.pranav.onlinebankingsystem.dto.TransferRequest;
import com.pranav.onlinebankingsystem.dto.WithdrawRequest;
import com.pranav.onlinebankingsystem.entity.Account;
import com.pranav.onlinebankingsystem.entity.Transaction;
import com.pranav.onlinebankingsystem.entity.User;
import com.pranav.onlinebankingsystem.repository.AccountRepository;
import com.pranav.onlinebankingsystem.repository.TransactionRepository;
import com.pranav.onlinebankingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    

    public Account createAccount(AccountRequest request) {

        Optional<User> optionalUser =
                userRepository.findById(request.getUserId());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        Account account = new Account();

        account.setAccountNumber("ACC" + System.currentTimeMillis());

        account.setAccountType(request.getAccountType());

        account.setBalance(
                BigDecimal.valueOf(request.getInitialDeposit()));

        account.setStatus("ACTIVE");

        account.setUser(user);

        return accountRepository.save(account);
    }

    public Account getAccountByNumber(String accountNumber) {

        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));
    }
    public Account getMyAccount(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return accountRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));
    }
    public Account deposit(DepositRequest request) {


        Account account = accountRepository
                .findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));
        if (!account.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Account is frozen");
        }
        account.setBalance(
                account.getBalance().add(request.getAmount()));

        Transaction transaction = new Transaction();

        transaction.setTransactionType("DEPOSIT");
        transaction.setAmount(request.getAmount());
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("SUCCESS");

        transaction.setSenderAccount(account);
        transaction.setReceiverAccount(null);

        transactionRepository.save(transaction);

        return accountRepository.save(account);
    }

    public Account withdraw(WithdrawRequest request) {

        Account account = accountRepository
                .findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));

        if (!account.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Account is frozen");
        }
        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(
                account.getBalance().subtract(request.getAmount()));

        Transaction transaction = new Transaction();

        transaction.setTransactionType("WITHDRAW");
        transaction.setAmount(request.getAmount());
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("SUCCESS");

        transaction.setSenderAccount(account);
        transaction.setReceiverAccount(null);

        transactionRepository.save(transaction);

        return accountRepository.save(account);
    }

    @Transactional
     public String transfer(TransferRequest request) {

        Account sender = accountRepository
                .findByAccountNumber(request.getFromAccount())
                .orElseThrow(() ->
                        new RuntimeException("Sender account not found"));

        if (!sender.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Sender account is frozen");
        }
        Account receiver = accountRepository
                .findByAccountNumber(request.getToAccount())
                .orElseThrow(() ->
                        new RuntimeException("Receiver account not found"));

        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        sender.setBalance(
                sender.getBalance().subtract(request.getAmount()));

        receiver.setBalance(
                receiver.getBalance().add(request.getAmount()));

        accountRepository.save(sender);
        accountRepository.save(receiver);

        Transaction transaction = new Transaction();

        transaction.setTransactionType("TRANSFER");
        transaction.setAmount(request.getAmount());
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("SUCCESS");

        transaction.setSenderAccount(sender);
        transaction.setReceiverAccount(receiver);

        transactionRepository.save(transaction);

        return "Transfer successful";
    }
    public String freezeAccount(String accountNumber) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));

        account.setStatus("FROZEN");

        accountRepository.save(account);

        return "Account frozen successfully";
    }
    public String unfreezeAccount(String accountNumber) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));

        account.setStatus("ACTIVE");

        accountRepository.save(account);

        return "Account activated successfully";
    }
}