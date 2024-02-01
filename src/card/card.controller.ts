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

@Controller('user/:userId/column/:columnId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @UseGuards(UserGuard)
  @Post()
  createCard(
    @Body() createCardDto: CreateCardDto,
    @Param('colomnId') columnId: number,
  ) {
    return this.cardService.createCard(createCardDto, columnId);
  }

  @Get()
  findAllCards(@Param('columnId') columnId: number) {
    return this.cardService.findAllCards(columnId);
  }

  @Get(':id')
  findOneCard(@Param('id') id: string) {
    return this.cardService.findOneCard(+id);
  }
  @UseGuards(UserGuard)
  @Patch(':id')
  updateCard(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.updateCard(+id, updateCardDto);
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  removeCard(@Param('id') id: string) {
    return this.cardService.removeCard(+id);
  }
}
