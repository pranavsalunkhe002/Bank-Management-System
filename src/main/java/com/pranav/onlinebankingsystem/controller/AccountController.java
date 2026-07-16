package com.pranav.onlinebankingsystem.controller;

import com.pranav.onlinebankingsystem.dto.AccountRequest;
import com.pranav.onlinebankingsystem.entity.Account;
import com.pranav.onlinebankingsystem.service.AccountService;
import com.pranav.onlinebankingsystem.dto.WithdrawRequest;
import com.pranav.onlinebankingsystem.dto.TransferRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.pranav.onlinebankingsystem.dto.DepositRequest;
import com.pranav.onlinebankingsystem.dto.ApiResponse;
import java.security.Principal;
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;
    @PostMapping
    public ApiResponse<Account> createAccount(
            @RequestBody AccountRequest request) {

        Account account = accountService.createAccount(request);

        return new ApiResponse<>(
                true,
                "Account created successfully",
                account
        );
    }
    @GetMapping("/{accountNumber}")
    public ApiResponse<Account> getAccountByNumber(
            @PathVariable String accountNumber) {

        Account account =
                accountService.getAccountByNumber(accountNumber);

        return new ApiResponse<>(
                true,
                "Account fetched successfully",
                account
        );
    }
    @GetMapping("/my-account")
    public ApiResponse<Account> getMyAccount(
            Principal principal) {

        Account account =
                accountService.getMyAccount(
                        principal.getName());

        return new ApiResponse<>(
                true,
                "Account fetched successfully",
                account
        );
    }
    @PostMapping("/deposit")
    public ApiResponse<Account> deposit(
            @RequestBody DepositRequest request) {

        Account account = accountService.deposit(request);

        return new ApiResponse<>(
                true,
                "Deposit successful",
                account
        );
    }
    @PostMapping("/withdraw")
    public ApiResponse<Account> withdraw(
            @RequestBody WithdrawRequest request) {

        Account account = accountService.withdraw(request);

        return new ApiResponse<>(
                true,
                "Withdrawal successful",
                account
        );
    }
    @PostMapping("/transfer")
    public ApiResponse<String> transfer(
            @RequestBody TransferRequest request) {

        String result = accountService.transfer(request);

        return new ApiResponse<>(
                true,
                result,
                null
        );
    }
    @PutMapping("/freeze/{accountNumber}")
    public ApiResponse<String> freezeAccount(
            @PathVariable String accountNumber) {

        String result =
                accountService.freezeAccount(accountNumber);

        return new ApiResponse<>(
                true,
                result,
                null
        );
    }
    @PutMapping("/unfreeze/{accountNumber}")
    public ApiResponse<String> unfreezeAccount(
            @PathVariable String accountNumber) {

        String result =
                accountService.unfreezeAccount(accountNumber);

        return new ApiResponse<>(
                true,
                result,
                null
        );
    }
}