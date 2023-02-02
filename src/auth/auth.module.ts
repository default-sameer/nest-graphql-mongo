import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthResolver } from './resolver/auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './utils/Local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, AuthResolver, LocalStrategy],
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'local' })],
})
export class AuthModule {}
