import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/users/users.service';
import { AllowedRoles } from './role.decorator';

// true를 반환하면 request를 진행시키고 false면 멈춘다.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // Reflector는 SetMetadata('roles', roles); 인 metadata에 접근할 수 있게 해준다.
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('AuthGuard on auth.guard.ts');
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }
    let token = null;
    const host = GqlExecutionContext.create(context);
    if (host) {
      if (host.getType() === 'http') {
        const request = host.getArgByIndex(0);
        token = request.headers['x-jwt'];
      } else if (host.getType() === 'graphql') {
        let gqlContext = host.getContext();
        token = gqlContext.token;
      }
    }
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      console.log(decoded);
      console.log('decoded');
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await this.userService.findById(decoded['id']);
        if (user) {
          let gqlContext = host.getContext();
          gqlContext['user'] = user;

          if (roles.includes('Any')) {
            return true;
          }
          return roles.includes(user.role);
        }
      }
    }
    return false;
  }
}
