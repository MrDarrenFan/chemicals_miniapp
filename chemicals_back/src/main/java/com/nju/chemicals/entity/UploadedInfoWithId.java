package com.nju.chemicals.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadedInfoWithId {

    private Long id;
    private String chName;
    private String batchNumber;
    private String companyName;
    private String chemStatus;
    private String remark;
    private String location;

}
