package com.nlu.petstore.service;

import com.nlu.petstore.entity.Status;
import com.nlu.petstore.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusServiceImpl implements StatusService{
    @Autowired
    private StatusRepository statusRepository;
    @Override
    public List<Status> getAllStatus() {
        return statusRepository.findAll();
    }
}
