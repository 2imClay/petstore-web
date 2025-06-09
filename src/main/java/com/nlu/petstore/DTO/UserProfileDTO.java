package com.nlu.petstore.DTO;

import lombok.*;


import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Integer id;
    private String fullname;
    private String phoneNumber;
    private String email;
    private String address;
    private String avatar;
    private LocalDate birthDate;

}
