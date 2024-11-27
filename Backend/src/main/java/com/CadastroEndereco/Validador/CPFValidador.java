package com.CadastroEndereco.Validador;

import org.hibernate.validator.constraints.br.CPF;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class CPFValidador implements ConstraintValidator<CPF, String> {

    private static final String CPF_REGEX = "^(\\d{3}\\.){2}\\d{3}-\\d{2}$";

    @Override
    public void initialize(CPF cpf) {}

    @Override
    public boolean isValid(String cpf, ConstraintValidatorContext context) {
        if (cpf == null) {
            return false;
        }
        return Pattern.matches(CPF_REGEX, cpf);
    }
}

