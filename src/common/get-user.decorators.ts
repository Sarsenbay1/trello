// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as jwt from 'jsonwebtoken';
// import { EnvironmentVariables } from 'src/environment-variables';

// export const UserId = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const configService = new ConfigService<EnvironmentVariables, true>();

//     const request = ctx.switchToHttp().getRequest();

//     if (!request.headers.authorization) {
//       return null;
//     }

//     const token = request.headers.authorization.replace('Bearer ', '');

//     // const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
//     const decoded: any = jwt.verify(
//       token,
//       configService.get<string>('JWT_SECRET'),
//     );
//     return decoded.sub;
//   },
// );
