package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.entity.PurchaseContract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseContractRepository extends JpaRepository<PurchaseContract, Long> {
    List<PurchaseContract> findByCustomerId(Long customerId);
}
