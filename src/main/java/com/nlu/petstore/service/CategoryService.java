package com.nlu.petstore.service;

import com.nlu.petstore.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category createCategory(Category category);

}
