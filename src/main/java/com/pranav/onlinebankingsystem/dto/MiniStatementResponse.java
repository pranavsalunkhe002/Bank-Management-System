package com.pranav.onlinebankingsystem.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MiniStatementResponse {

    private LocalDateTime transactionDate;
    private String transactionType;
    private BigDecimal amount;
    private String status;
    private String senderAccount;
    private String receiverAccount;
}