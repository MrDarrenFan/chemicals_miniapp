package com.nju.chemicals.service;

import com.nju.chemicals.entity.Product;
import com.nju.chemicals.entity.ProductWithId;
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

    // 取得所有化学品产品信息
    public List<ProductWithId> getAll() {
        return productMapper.selectAll();
    }

    // 添加一条化学品产品信息
    public String addOneByObj(Product product) {
        Integer resultNumber = productMapper.insertOneByObj(product);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "添加成功，影响行数：" + resultNumber;
        } else {
            resultText = "添加失败";
        }
        return resultText;
    }

    // 修改一条化学品产品信息
    public String editOneById(ProductWithId productWithId) {
        Integer resultNumber = productMapper.updateOneByObj(productWithId);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "修改成功，影响行数：" + resultNumber;
        } else {
            resultText = "修改失败";
        }
        return resultText;
    }

    // 通过id删除一条化学品产品信息
    public String removeOneById(Long id) {
        Integer resultNumber = productMapper.deleteOneById(id);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "删除成功，影响行数：" + resultNumber;
        } else {
            resultText = "删除失败";
        }
        return resultText;
    }

    // 根据cas号和批次号为每个化学品产品生成二维码
    public void generateQRCodes() {
        List<ProductWithId> allProducts = productMapper.selectAll();
        int count = 0;
        for (ProductWithId productWithId : allProducts) {
            String cas = productWithId.getCas().trim();
            String batchNumber = productWithId.getBatchNumber().trim();
            String parameter = cas + " " + batchNumber;
            String pathAndFileName = "D:/Programming/Github/chemicals_miniapp/chemicals_back/QRCode/"+ parameter +".png";
            QRCodeUtil.generateQRCodeAndSaveToPath(parameter, "png", 400, 400, pathAndFileName);
            System.out.println("化学品产品“" + parameter + "”的二维码生成成功！");
            count++;
        }
        System.out.println("共生成 " + count + " 个化学品产品二维码");
    }

}
