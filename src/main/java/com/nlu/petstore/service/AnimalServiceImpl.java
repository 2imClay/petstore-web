package com.nlu.petstore.service;

import com.nlu.petstore.entity.Animal;
import com.nlu.petstore.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalServiceImpl implements AnimalService{

    @Autowired
    private AnimalRepository animalRepository;

    @Override
    public List<Animal> getAllAnimal() {
        return animalRepository.findAll();
    }

    @Override
    public Animal createAnimal(Animal animal) {
        return animalRepository.save(animal);
    }
}
