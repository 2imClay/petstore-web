package com.nlu.petstore.controller;

import com.nlu.petstore.entity.Role;
import com.nlu.petstore.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @GetMapping
    public List<Role> getAllRole(){
        return roleService.getAllRole();
    }
}
