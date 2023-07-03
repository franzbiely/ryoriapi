import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../general/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.userCredential({ email: email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userPayload: {
        id: user.user.id,
        role: user.user.role,
        username: user.user.username,
        email: user.user.email,
        password: user.user.password,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        address: user.user.address,
        created_at: user.user.created_at,
      },
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
      store_Id: user.user.store?.id,
      Branch_Id: user.user.branch?.id,
    };
  }

  async create(data) {
    data.password = await bcrypt.hash(data.password, 10);
    const response = await this.userService.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
