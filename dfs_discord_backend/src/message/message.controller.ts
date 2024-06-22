import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { MessageService } from './message.service';
import { Message } from './message.schema';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //j'ajoute un un salon: ok
  @Post(':salonId')
  @UseGuards(AuthGuard)
  async createMessageInSalon(
    @Body() createMessageDto: any,
    @Param('salonId') salonId: string,
  ): Promise<Message> {
    return this.messageService.createMessageInSalon(createMessageDto, salonId);
  }
    
    
  @Get(':salonId')
  // @UseGuards(AuthGuard)
  findAll(@Request() requete, @Param("salonId") id: string) {

    return this.messageService.findAllFromSalon(id);
  }

}
