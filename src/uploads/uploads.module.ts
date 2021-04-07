import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { UploadsController } from './uploads.controller';
import { UploadsModuleOptions } from './uploads.interfaces';

@Module({
  controllers: [UploadsController],
})
@Global()
export class UploadsModule {
  static forRoot(options: UploadsModuleOptions): DynamicModule {
    return {
      module: UploadsModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,

          // app.module.ts에서 UploadsModule.forRoot()로 넘겨주는 값을 받아온다.
          // 여기서 얻은 options를 providers에 있는 UploadsService에 넘겨준다.
          useValue: options,
        },
        UploadsController,
      ],
    };
  }
}
