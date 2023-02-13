package Easy.Shop.Plus.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "customer")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
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
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
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