package Easy.Shop.Plus.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "customer")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "jmbg", unique = true, nullable = false)
    private String jmbg;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "br_lk", nullable = false)
    private String brLK;
    @Column(name = "pu", nullable = false)
    private String pu;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @JsonIgnore
    @OneToMany(mappedBy = "customer", cascade = ALL)//, orphanRemoval = true)
    @Column
//   @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "id")
    private List<PurchaseContract> purchaseContracts;

    public Customer(String lastName, String firstName, String jmbg, String address,
                    String brLK, String pu, String email, String phoneNumber,
                    List<PurchaseContract> purchaseContracts) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.jmbg = jmbg;
        this.address = address;
        this.brLK = brLK;
        this.pu = pu;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.purchaseContracts = purchaseContracts;
    }

    public Customer(String lastName, String firstName, String jmbg, String address,
                    String brLK, String pu, String email, String phoneNumber) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.jmbg = jmbg;
        this.address = address;
        this.brLK = brLK;
        this.pu = pu;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Customer(Long id, String lastName, String firstName, String jmbg, String address,
                    String brLK, String pu, String email, String phoneNumber) {
        this.id = id;
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