package com.nlu.petstore.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ImageController {

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping("/images")
    public ResponseEntity<List<String>> listImages() {
        try {
            File folder = new File(UPLOAD_DIR);
            File[] files = folder.listFiles();
            if (files == null) return ResponseEntity.ok(Collections.emptyList());

            List<String> filenames = Arrays.stream(files)
                    .filter(File::isFile)
                    .map(File::getName)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(filenames);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Lỗi: " + e.getMessage()));
        }
    }
}
