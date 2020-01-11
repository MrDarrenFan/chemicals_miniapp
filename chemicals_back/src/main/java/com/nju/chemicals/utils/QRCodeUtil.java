package com.nju.chemicals.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * 单独使用，用以按照化学品中文名生成每个化学品的二维码
 */
public class QRCodeUtil {

    private static final QRCodeWriter QR_CODE_WRITER = new QRCodeWriter();

    /**
     * 生成二维码
     * @param text  用于生成的文本内容
     * @param format    二维码图片格式
     * @param width     二维码宽度
     * @param height    二维码高度
     * @param path      保存路径
     */
    public static void generateQRCodeAndSaveToPath(String text, String format, int width, int height, String path) {
        try {
            MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
            Map hints = new HashMap();
            //设置UTF-8， 防止中文乱码
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            //设置二维码四周白色区域的大小
            hints.put(EncodeHintType.MARGIN, 0);
            //设置二维码的容错性
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
            //画二维码，记得调用multiFormatWriter.encode()时最后要带上hints参数，不然上面设置无效
            BitMatrix bitMatrix = multiFormatWriter.encode(text, BarcodeFormat.QR_CODE, width, height, hints);
            //开始画二维码
            MatrixToImageWriter.writeToPath(bitMatrix, format, Paths.get(path));
        } catch (Exception e) {
            throw new RuntimeException(String.format("二维码生成错误！"), e);
        }
    }

}
