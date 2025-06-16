package com.nlu.petstore.service;

import com.nlu.petstore.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category createCategory(Category category);
    String getCategoryNameById(int id);

}
