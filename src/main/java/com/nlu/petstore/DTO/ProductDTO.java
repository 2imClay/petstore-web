package com.nlu.petstore.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class ProductDTO {
        private int id;
        private String title;
        private String brand;
        private float price;
        private int amount;
        private String description;
        private int id_category;
        private int id_animal;
        private List<String> images;
}
