package com.nju.chemicals.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Configuration
public class UploadedInfo {

    private String chName;
    private String batchNumber;
    private String companyName;
    private String chemStatus;
    private String remark;
    private String location;

}
