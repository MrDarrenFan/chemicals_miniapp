package com.nju.chemicals.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoForPoliceWithId {

    private Long id;
    private String chName;
    private String remark;
    private String location;

}
