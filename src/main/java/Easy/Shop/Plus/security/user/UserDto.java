package Easy.Shop.Plus.security.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    //RegisterRequest

    private Integer id;
    private String email;
    private String password;
    private Role role;

}
