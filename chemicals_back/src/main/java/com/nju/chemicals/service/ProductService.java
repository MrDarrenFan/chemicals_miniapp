package com.nju.chemicals.service;

import com.nju.chemicals.entity.Chemical;
import com.nju.chemicals.entity.Product;
import com.nju.chemicals.mapper.ProductMapper;
import com.nju.chemicals.utils.QRCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    // 通过cas号和批号查询一个化学品产品
    public Product getOneByCASAndBatchNumber(String casAndBatchNumber) {
        String[] parameters = casAndBatchNumber.split(" ");
        return productMapper.selectOneByCASAndBatchNumber(parameters[0].trim(), parameters[1].trim());
    }

    // 根据cas号和批次号为每个化学品产品生成二维码
    public void generateQRCodes() {
        List<Product> allProducts = productMapper.selectAll();
        int count = 0;
        for (Product product : allProducts) {
            String cas = product.getCas().trim();
            String batchNumber = product.getBatchNumber().trim();
            String parameter = cas + " " + batchNumber;
            String pathAndFileName = "D:/Programming/Github/chemicals_miniapp/chemicals_back/QRCode/"+ parameter +".png";
            QRCodeUtil.generateQRCodeAndSaveToPath(parameter, "png", 400, 400, pathAndFileName);
            System.out.println("化学品产品“" + parameter + "”的二维码生成成功！");
            count++;
        }
        System.out.println("共生成 " + count + " 个化学品产品二维码");
    }

}
