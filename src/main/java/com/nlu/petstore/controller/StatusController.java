package com.nlu.petstore.controller;

import com.nlu.petstore.entity.Role;
import com.nlu.petstore.entity.Status;
import com.nlu.petstore.service.RoleService;
import com.nlu.petstore.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/order/status")
public class StatusController {
    @Autowired
    private StatusService statusService;
    @GetMapping
    public List<Status> getAllStatus(){
        return statusService.getAllStatus();
    }
}
