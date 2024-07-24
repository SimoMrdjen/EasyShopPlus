package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    List<User> findByEmailLike(String usernameLike);
}
