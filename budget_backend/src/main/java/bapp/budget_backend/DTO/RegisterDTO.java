package bapp.budget_backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO{

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String confirmPassword;
}
