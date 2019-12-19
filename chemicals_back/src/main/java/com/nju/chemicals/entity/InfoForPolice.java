package com.nju.chemicals.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoForPolice {

    private String chName;
    private String remark;
    private String location;

}
