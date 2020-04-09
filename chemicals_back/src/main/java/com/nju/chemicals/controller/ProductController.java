package com.nju.chemicals.controller;

import com.nju.chemicals.entity.Product;
import com.nju.chemicals.entity.ProductWithId;
import com.nju.chemicals.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

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

    // 取得所有化学品产品信息
    @ResponseBody
    @RequestMapping("/getAll")
    public List<ProductWithId> getAll() {
        return productService.getAll();
    }

    // 添加一条化学品产品信息
    @ResponseBody
    @RequestMapping("/addOneByObj")
    public String addOneByObj(@RequestBody Product product) {
        return productService.addOneByObj(product);
    }

    // 修改一条化学品产品信息
    @ResponseBody
    @RequestMapping("/editOneById")
    public String editOneById(@RequestBody ProductWithId productWithId) {
        return productService.editOneById(productWithId);
    }

    // 通过id删除一条化学品产品信息
    @ResponseBody
    @RequestMapping("/removeOneById/{id}")
    public String removeOneById(@PathVariable Long id) {
        return productService.removeOneById(id);
    }

    // 生成二维码时启用该功能
    // 根据cas号和批次号为每个化学品产品生成二维码
//    @RequestMapping("/generateQRCodes")
//    public void generateQRCodes() {
//        productService.generateQRCodes();
//    }

}
