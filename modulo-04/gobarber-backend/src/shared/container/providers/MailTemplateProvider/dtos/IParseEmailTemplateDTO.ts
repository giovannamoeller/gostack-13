interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IParseEmailTemplateDTO {
    file: string;
    variables: ITemplateVariables; // não consigo definir ainda, precisa ser um objeto que pode receber qualquer coisa
}