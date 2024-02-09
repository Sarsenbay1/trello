import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UserGuard } from 'src/user/user.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateCardRto } from './rto/create-card.rto';
import { CardRto } from './rto/card.rto';
import { DeleteCardRto } from './rto/delete-card.rto';

@Controller('user/:userId/column/:columnId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOkResponse({
    description: 'The create card',
    type: CreateCardRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Post()
  createCard(
    @Body() createCardDto: CreateCardDto,
    @Param('colomnId') columnId: number,
  ) {
    return this.cardService.createCard(createCardDto, columnId);
  }
  @ApiOkResponse({
    description: 'The getting all cards',
    type: CardRto,
    isArray: true,
  })
  @Get()
  findAllCards(@Param('columnId') columnId: number) {
    return this.cardService.findAllCards(columnId);
  }
  @ApiOkResponse({
    description: 'The getting one card',
    type: CardRto,
    isArray: false,
  })
  @Get(':id')
  findOneCard(@Param('id') id: string) {
    return this.cardService.findOneCard(+id);
  }

  @ApiOkResponse({
    description: 'The update card',
    type: CardRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Patch(':id')
  updateCard(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.updateCard(+id, updateCardDto);
  }

  @ApiOkResponse({
    description: 'The delete card',
    type: DeleteCardRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  removeCard(@Param('id') id: string) {
    return this.cardService.removeCard(+id);
  }
}
