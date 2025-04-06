package bapp.budget_backend.models.enums;

public enum Categories {
    RENT, GROCERIES, GAS, SAVINGS, OTHER;
    public static Categories fromString(String value){
        return Categories.valueOf(value.toUpperCase());
    }
}
