import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserService } from './users.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }
}
