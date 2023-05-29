import { ApiProperty } from "@nestjs/swagger";

export class Ranking {
  @ApiProperty({ name: "item", description: "Item to search" })
  item!: string;
  @ApiProperty({ description: "Limit of items to return", required: false, default: 10 })
  limit?: number = 10;
  @ApiProperty({ description: "Property to sort by", required: false, default: 'asc', enum: ['asc', 'desc'] })
  sort?: string = 'asc';
  @ApiProperty({ description: "Property to order by", required: false, default: 'rank' })
  orderBy?: string = 'rank';
}
