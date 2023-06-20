import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  userCredential(query: object | any): Promise<Users> {
    const x = this.usersRepository.findOneBy(query);
    return x;
  }
  findAll(): Promise<Users[]> {
    return this.usersRepository.find({});
  }

  findById(id: object | any): Promise<Users> {
    const getOneById = this.usersRepository.findOneBy({ id });
    return getOneById;
  }

  async create(_user: CreateUsersDto): Promise<Users> {
    const user = new Users();
    user.role = _user.role;
    user.username = _user.username;
    user.firstName = _user.firstName;
    user.lastName = _user.lastName;
    user.email = _user.email;
    user.password = _user.password;
    user.address = _user.address;

    return this.usersRepository.save(user);
  }

  async update(id: number, user: Users) {
    await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
