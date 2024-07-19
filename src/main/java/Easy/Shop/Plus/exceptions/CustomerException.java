package Easy.Shop.Plus.exceptions;

public class CustomerException extends Exception {
    public CustomerException(String message) {
        super(message);
    }

    public CustomerException(String message, Throwable cause) {
        super(message, cause);
    }
}

