import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    const decode = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const userIdFromJwt = decode.sub;
    const userIdFromUrl = request.params.userId
      ? request.params.userId
      : request.params.id;

    let path = request.path;

    if (!request.params.userId && userIdFromJwt == userIdFromUrl) {
      return true;
    }
    if (
      request.params.userId &&
      !request.params.columnId &&
      !request.params.id &&
      userIdFromJwt == userIdFromUrl
    ) {
      return true;
    }
    if (
      userIdFromJwt == userIdFromUrl &&
      (await this.pathAffiliation(path, userIdFromJwt))
    ) {
      return true;
    }
  }

  private getRepository(entityType: string): Repository<any> {
    switch (entityType) {
      case 'column':
        return this.columnRepository;
      case 'card':
        return this.cardRepository;
      case 'comment':
        return this.commentRepository;
    }
  }

  private async isAvailable(
    entityType: string,
    entityId: number,
    userId: number,
  ): Promise<boolean> {
    const repository = this.getRepository(entityType); // получил репозиторий
    const entity = await repository.findOne({
      where: { id: entityId },
      relations: ['user'],
    });
    const authorEntity = await this.userRepository.findOneBy({
      id: entity.user.id,
    });

    return userId == authorEntity.id;
  }

  private async pathAffiliation(path: string, userId: number) {
    let pathList = path.replace('/', '').split('/');
    console.log(pathList.length);
    console.log(pathList);
    if (path.length % 2 != 0) {
      pathList.pop();
    }

    for (let i = 2; i < pathList.length; i += 2) {
      console.log(pathList[i], +pathList[i + 1], userId);

      if (!(await this.isAvailable(pathList[i], +pathList[i + 1], userId))) {
        return false;
      }
    }
    return true;
  }
}
