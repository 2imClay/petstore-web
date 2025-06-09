package com.nlu.petstore.service;

import com.nlu.petstore.entity.Animal;

import java.util.List;

public interface AnimalService {
    List<Animal> getAllAnimal();
    Animal createAnimal(Animal animal);
}
