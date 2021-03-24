import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import { MailService } from './mail.service';

@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,

          // app.module.ts에서 MailModule.forRoot()로 넘겨주는 값을 받아온다.
          // 여기서 얻은 options를 providers에 있는 MailService에 넘겨준다.
          useValue: options,
        },
        MailService,
      ],

      // exports에 추가함으로써 resolver 같은 곳에서 쓸 수 있게 한다.
      exports: [MailService],
    };
  }
}
