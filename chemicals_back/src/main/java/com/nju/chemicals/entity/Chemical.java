package com.nju.chemicals.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chemical {

    private String chName;
    private String cas;
    private String alias;
    private String enName;
    private String formula;
    private Double weight;
    private String property;
    private String stabAndReact;
    private String dangerOV;
    private String dangerCA;
    private String operAndStore;
    private String ctrlAndDef;
    private String firstAid;
    private String leakTreatment;
    private String disposal;

}
