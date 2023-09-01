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
import { UsersSchema } from 'src/general/user/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchSchema } from 'src/general/branch/branch.model';
import { StoreSchema } from 'src/general/store/store.model';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Users', schema: UsersSchema},
      {name: 'Store', schema: StoreSchema},
      {name: 'Branch', schema: BranchSchema}
    ]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy, Utils],
  controllers: [AuthController],
  exports: [UserService, AuthService],
})
export class AuthModule {}
