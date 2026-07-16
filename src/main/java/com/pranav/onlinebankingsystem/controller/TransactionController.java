package com.pranav.onlinebankingsystem.controller;


import com.pranav.onlinebankingsystem.entity.Transaction;
import com.pranav.onlinebankingsystem.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pranav.onlinebankingsystem.dto.MiniStatementResponse;
import java.util.List;
import com.pranav.onlinebankingsystem.dto.ApiResponse;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{accountNumber}")
    public ApiResponse<List<MiniStatementResponse>> getTransactions(
            @PathVariable String accountNumber) {

        List<MiniStatementResponse> transactions =
                transactionService.getMiniStatement(accountNumber);

        return new ApiResponse<>(
                true,
                "Transactions fetched successfully",
                transactions
        );
    }
    @GetMapping("/history/{accountNumber}")
    public ApiResponse<List<MiniStatementResponse>>
    getTransactionHistory(
            @PathVariable String accountNumber) {

        List<MiniStatementResponse> transactions =
                transactionService.getTransactionHistory(
                        accountNumber);

        return new ApiResponse<>(
                true,
                "Transaction history fetched successfully",
                transactions
        );
    }
}