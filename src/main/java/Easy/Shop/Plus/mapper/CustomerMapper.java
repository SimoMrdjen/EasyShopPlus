package Easy.Shop.Plus.mapper;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.entity.Customer;
import org.springframework.stereotype.Component;


@Component
public class CustomerMapper {
    public Customer mapEditCustomerDtoToEntity(CustomerDto customerDto) {
        return new Customer(customerDto.getId(),
                customerDto.getLastName(),
                customerDto.getFirstName(),
                customerDto.getJmbg(),
                customerDto.getAddress(),
                customerDto.getBrLK(),
                customerDto.getPu(),
                customerDto.getEmail(),
                customerDto.getPhoneNumber()
        );
    }

    public static boolean containsCyrillic(String input) {
        return input.matches(".*[А-Яа-яЁё].*");
    }

    public static String cyrillicToLatin(String input) {
        if (!containsCyrillic(input)) {
            return input;
        }
        String[][] letters = {
                {"А", "A"}, {"Б", "B"}, {"В", "V"}, {"Г", "G"}, {"Д", "D"},
                {"Ђ", "Đ"}, {"Е", "E"}, {"Ж", "Ž"}, {"З", "Z"}, {"И", "I"},
                {"Ј", "J"}, {"К", "K"}, {"Л", "L"}, {"Љ", "Lj"}, {"М", "M"},
                {"Н", "N"}, {"Њ", "Nj"}, {"О", "O"}, {"П", "P"}, {"Р", "R"},
                {"С", "S"}, {"Т", "T"}, {"Ћ", "Ć"}, {"У", "U"}, {"Ф", "F"},
                {"Х", "H"}, {"Ц", "C"}, {"Ч", "Č"}, {"Џ", "Dž"}, {"Ш", "Š"},
                {"а", "a"}, {"б", "b"}, {"в", "v"}, {"г", "g"}, {"д", "d"},
                {"ђ", "đ"}, {"е", "e"}, {"ж", "ž"}, {"з", "z"}, {"и", "i"},
                {"ј", "j"}, {"к", "k"}, {"л", "l"}, {"љ", "lj"}, {"м", "m"},
                {"н", "n"}, {"њ", "nj"}, {"о", "o"}, {"п", "p"}, {"р", "r"},
                {"с", "s"}, {"т", "t"}, {"ћ", "ć"}, {"у", "u"}, {"ф", "f"},
                {"х", "h"}, {"ц", "c"}, {"ч", "č"}, {"џ", "dž"}, {"ш", "š"}
        };
        for (String[] letter : letters) {
            input = input.replace(letter[0], letter[1]);
        }
        return input;
    }


    public Customer mapCreateCustomerDtoToEntity(CustomerDto customerDto) {
        return Customer.builder()
                .lastName(cyrillicToLatin(customerDto.getLastName()))
                .firstName(cyrillicToLatin(customerDto.getFirstName()))
                .address(cyrillicToLatin(customerDto.getAddress()))
                .brLK(customerDto.getBrLK())
                .pu(cyrillicToLatin(customerDto.getPu()))
                .email(customerDto.getEmail())
                .phoneNumber(customerDto.getPhoneNumber())
                .jmbg(customerDto.getJmbg())
                .build();
    }

    public CustomerDto mapEntityToCustomerDto(Customer customer) {
        return new CustomerDto(customer.getId(),
                customer.getLastName(),
                customer.getFirstName(),
                customer.getJmbg(),
                customer.getAddress(),
                customer.getBrLK(),
                customer.getPu(),
                customer.getEmail(),
                customer.getPhoneNumber());
    }
}

