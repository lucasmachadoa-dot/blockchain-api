import { Controller, Get } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('api')
export class BlockchainController {

  constructor(
    private readonly blockchainService: BlockchainService,
  ) {}

  @Get('token-info')
  async getTokenInfo() {

    return await this.blockchainService.getTokenInfo();
  }
}