interface TechExperience {
    title: string,
    salary: number,
    year: number
}

interface User {
    name?: string, // não obrigatório
    email: string,
    password: string,
    techs: Array<string | TechExperience>
} 

export default function createUser({ name = '', email, password }: User) {
    const user = {
        name,
        email,
        password
    }
    return user;
}