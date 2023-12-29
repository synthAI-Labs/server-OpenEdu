import { ApiProperty } from "@nestjs/swagger";

export class UserSettingsDto {
  @ApiProperty()
  publicProfile: boolean;

  @ApiProperty()
  publicEmail: boolean;

  @ApiProperty()
  publicBio: boolean;

  @ApiProperty()
  publicPhoto: boolean;

  @ApiProperty()
  publicName: boolean;

  @ApiProperty()
  publicInterests: boolean;
}
