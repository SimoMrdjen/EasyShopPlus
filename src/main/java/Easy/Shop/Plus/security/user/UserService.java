package Easy.Shop.Plus.security.user;

import Easy.Shop.Plus.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> getAllUsers() {
        return
                userRepository.findAll()
                        .stream()
                        .map(mapper::mappUserToDto)
                        .collect(Collectors.toList());
    }

    public UserDto getUser(Integer id) {
        return mapper.mappUserToDto(
                userRepository.findById(id).orElseThrow());
    }

    public List<UserDto> getUsersLike(String usernameLike) {
        return userRepository.findByEmailLike(usernameLike)
                .stream()
                .map(mapper::mappUserToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto createUser(UserDto userDto) {
        return  mapper.mappUserToDto(
                userRepository.save(mapper.mapDtoToUser(userDto)));
    }

    @Transactional
    public UserDto updateUser(UserDto userDto, Integer id) {
        var userExisting = userRepository.findById(id).orElseThrow();
        userExisting.setEmail(userDto.getEmail());
        userExisting.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userExisting.setRole(userDto.getRole());
        return mapper.mappUserToDto(userRepository.save(userExisting));
    }
}
