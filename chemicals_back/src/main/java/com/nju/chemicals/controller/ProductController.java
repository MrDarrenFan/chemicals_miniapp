package com.nju.chemicals.controller;

import com.nju.chemicals.entity.Product;
import com.nju.chemicals.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 通过cas号和批号查询一个化学品产品
    @ResponseBody
    @RequestMapping("/getOneByQRCode/{casAndBatchNumber}")
    public Product getOneByCASAndBatchNumber(@PathVariable String casAndBatchNumber) {
        return productService.getOneByCASAndBatchNumber(casAndBatchNumber);
    }

    // 根据cas号和批次号为每个化学品产品生成二维码
//    @RequestMapping("/generateQRCodes")
//    public void generateQRCodes() {
//        productService.generateQRCodes();
//    }

}
