import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {

  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor(
    private configService: ConfigService,
  ) {

    const rpcUrl =
      this.configService.get<string>('SEPOLIA_RPC_URL');

    this.provider =
      new ethers.JsonRpcProvider(rpcUrl);

    const contractAddress =
      '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

    const erc20Abi = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function balanceOf(address account) view returns (uint256)',
    ];

    this.contract = new ethers.Contract(
      contractAddress,
      erc20Abi,
      this.provider,
    );
  }

  async getTokenInfo() {

    const name =
      await this.contract.name();

    const symbol =
      await this.contract.symbol();

    const totalSupply =
      await this.contract.totalSupply();

    return {
      name,
      symbol,
      totalSupply: totalSupply.toString(),
    };
  }
}