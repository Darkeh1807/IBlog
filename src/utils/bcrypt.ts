import * as bcrypt from 'bcrypt';

abstract class Bcrypt {
    abstract hashPassword(password: string): Promise<string>;
    abstract compare(password: string, encryptedPassword: string): Promise<boolean>;
}


class BcryptImpl extends Bcrypt {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async compare(password: string, encryptedPassword: string): Promise<boolean> {
        const isPassMatch = await bcrypt.compare(password, encryptedPassword);
        return isPassMatch;
    }

}

export const bcryptImpl = new BcryptImpl();
