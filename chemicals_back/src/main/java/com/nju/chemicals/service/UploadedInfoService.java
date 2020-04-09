package com.nju.chemicals.service;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.entity.UploadedInfoWithId;
import com.nju.chemicals.mapper.UploadedInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.*;

@Service
public class UploadedInfoService {


    private LinkedBlockingQueue queue = new LinkedBlockingQueue<Runnable>(1000);
    private ThreadPoolExecutor pool = new ThreadPoolExecutor(10, 20, 1L, TimeUnit.MILLISECONDS, queue);



    @Autowired
    private UploadedInfoMapper uploadedInfoMapper;

    // 取得所有上传信息
    public List<UploadedInfoWithId> getAll() {
        return uploadedInfoMapper.selectAll();
    }

    // 添加一条上传信息
    public Boolean addOneByObj(UploadedInfo uploadedInfo)  {

        InfoFutureTask task=new InfoFutureTask(uploadedInfo);

        Future<InfoFutureTask> future = (Future<InfoFutureTask>) pool.submit(new InfoThread(task),task);
        Integer res = null;
        try{
            res=future.get().getState();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return res==null ? false:true;

    }

    // 修改一条上传信息
    public String editOneById(UploadedInfoWithId uploadedInfoWithId) {
        Integer resultNumber = uploadedInfoMapper.updateOneByObj(uploadedInfoWithId);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "修改成功，影响行数：" + resultNumber;
        } else {
            resultText = "修改失败";
        }
        return resultText;
    }

    // 通过id删除一条上传信息
    public String removeOneById(Long id) {
        Integer resultNumber = uploadedInfoMapper.deleteOneById(id);
        String resultText = "";
        if (resultNumber > 0) {
            resultText = "删除成功，影响行数：" + resultNumber;
        } else {
            resultText = "删除失败";
        }
        return resultText;
    }

}
