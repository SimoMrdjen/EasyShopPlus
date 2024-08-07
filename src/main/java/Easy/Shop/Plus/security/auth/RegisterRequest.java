package Easy.Shop.Plus.security.auth;

import Easy.Shop.Plus.security.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private Integer id;

    private String email;
    private String password;
    private Role role;
}
