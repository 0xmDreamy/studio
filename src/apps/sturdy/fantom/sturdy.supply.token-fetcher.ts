import { PositionTemplate } from '~app-toolkit/decorators/position-template.decorator';
import { AaveAmmLendingTemplateTokenFetcher } from '~apps/aave-amm/common/aave-amm.lending.template.token-fetcher';
import { AaveAmmAToken } from '~apps/aave-amm/contracts';
import {
  AaveV2LendingTokenDataProps,
  AaveV2ReserveApyData,
  AaveV2ReserveTokenAddressesData,
} from '~apps/aave-v2/common/aave-v2.lending.token-fetcher';
import { GetDisplayPropsParams } from '~position/template/app-token.template.types';

@PositionTemplate()
export class FantomSturdySupplyTokenFetcher extends AaveAmmLendingTemplateTokenFetcher {
  groupLabel = 'Lending';
  providerAddress = '0x7ff2520cd7b76e8c49b5db51505b842d665f3e9a';
  isDebt = false;

  getTokenAddress(reserveTokenAddressesData: AaveV2ReserveTokenAddressesData): string {
    return reserveTokenAddressesData.aTokenAddress;
  }

  getApyFromReserveData(reserveApyData: AaveV2ReserveApyData): number {
    return reserveApyData.supplyApy;
  }

  async getTertiaryLabel({ appToken }: GetDisplayPropsParams<AaveAmmAToken, AaveV2LendingTokenDataProps>) {
    return `${(appToken.dataProps.apy * 100).toFixed(3)}% APY`;
  }
}
