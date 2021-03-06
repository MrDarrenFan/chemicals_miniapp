package com.nju.chemicals.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductWithId {

    private Long id;
    private String cas;
    private String batchNumber;
    private String manuName;
    private Date manufactureDate;

}
