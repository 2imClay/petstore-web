package com.nlu.petstore.controller;

import com.nlu.petstore.entity.Animal;
import com.nlu.petstore.entity.Category;
import com.nlu.petstore.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public List<Animal> getAllAnimal(){
        return animalService.getAllAnimal();
    }

    @PostMapping("/create")
    public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) {
        Animal created = animalService.createAnimal(animal);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
