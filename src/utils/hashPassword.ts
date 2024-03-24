import { compareSync, genSalt, hash } from 'bcryptjs'

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt as string)
    return hashedPassword
}

export const comparePassword = (password: string, hashedPassword: string): boolean => {
    const isMatch = compareSync(password, hashedPassword)
    return isMatch
}
