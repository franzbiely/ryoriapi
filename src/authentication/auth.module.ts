/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../general/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';
import { UserService } from 'src/general/user/user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from 'src/general/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    Users,
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
],
  providers: [UserService,AuthService,  LocalStrategy, JwtStrategy,],
  controllers: [AuthController],
  exports: [UserService,AuthService],
})
export class AuthModule {}