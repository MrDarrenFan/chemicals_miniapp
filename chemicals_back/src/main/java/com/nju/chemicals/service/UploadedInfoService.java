package com.nju.chemicals.service;

import com.nju.chemicals.entity.UploadedInfo;
import com.nju.chemicals.mapper.UploadedInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;

@Service
public class UploadedInfoService {


    private LinkedBlockingQueue queue=new LinkedBlockingQueue<Runnable>(1000);
    private ThreadPoolExecutor pool = new ThreadPoolExecutor(10, 20, 1L, TimeUnit.MILLISECONDS, queue);



    @Autowired
     private UploadedInfoMapper uploadedInfoMapper;


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

}
