import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
}

function cpfCnpjValidator(value: unknown,
    options: Options,
    field: FieldContext) {
    let document = String(value).replace(/\D/g, '');

    if (document.length < 11) {
        field.report(
            'The {{ field }} field is not a Valid CPF or CNPJ',
            'invalid',
            field
        )
    }



    if (document.length > 11 && document.length < 14) {
        field.report(
            'The {{ field }} field is not a Valid CPF OR CNPJ',
            'invalid',
            field
        )
    }


    if (document.length == 11 || document.length == 14) {


        if (document.length == 11) {
            const isValid = checkCpf(document)

            if (!isValid) {
                field.report(
                    'The {{ field }} field is not a Valid CPF',
                    'invalid',
                    field
                )
            }
        }


        if (document.length == 14) {
            const isValid = checkCnpj(document)

            if (!isValid) {
                field.report(
                    'The {{ field }} field is not a Valid CNPJ',
                    'invalid',
                    field
                )
            }
        }



    }



}

function checkCpf(cpf: string): boolean {
    let sum;
    let rest;
    sum = 0;


    if (cpf == "00000000000") {
        return false
    }

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = sum % 11;

    if (rest == 10 || rest == 11 || rest < 2) {
        rest = 0;
    } else {
        rest = 11 - rest;
    }

    if (rest != parseInt(cpf.substring(9, 10))) {
        return false
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = sum % 11;

    if (rest == 10 || rest == 11 || rest < 2) {
        rest = 0;
    } else {
        rest = 11 - rest;
    }

    if (rest != parseInt(cpf.substring(10, 11))) {
        return false
    }

    return true
}

function checkCnpj(cnpj: string): boolean {
    let tamanhoTotal = cnpj.length - 2
    let cnpjSemDigitos: any = cnpj.substring(0, tamanhoTotal);
    let digitosVerificadores = cnpj.substring(tamanhoTotal);
    let soma = 0;
    let pos = tamanhoTotal - 7;

    for (let i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    let resultado: any = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (let i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;
    return true
}

export const documentRule = vine.createRule(cpfCnpjValidator)