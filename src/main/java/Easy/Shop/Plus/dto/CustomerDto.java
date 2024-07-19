package Easy.Shop.Plus.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class CustomerDto {

    private Long id;
    @NotBlank
    private String lastName;
    private String firstName;
    @Length(max = 13, min = 13)
    private String jmbg;
    private String address;
    private String brLK;
    private String pu;
    @Email
    private String email;
    private String phoneNumber;

    public CustomerDto(String lastName,
                       String firstName,
                       String jmbg,
                       String address,
                       String brLK,
                       String pu,
                       String email,
                       String phoneNumber)
    {
        this.lastName = lastName;
        this.firstName = firstName;
        this.jmbg = jmbg;
        this.address = address;
        this.brLK = brLK;
        this.pu = pu;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}

