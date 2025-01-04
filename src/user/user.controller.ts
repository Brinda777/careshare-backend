import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationInput } from 'src/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Query() paginationInput?: PaginationInput) {
    const [users, count] = await this.userService.get(
      null,
      null,
      paginationInput,
    );
    return {
      data: users,
      meta: {
        limit: paginationInput?.limit || 10,
        page: paginationInput?.page || 1,
        total: count,
      },
    };
  }

  @Patch(':id') // adding auth decorator would be a good approach instead of passing id as a parameter
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    if (result.affected === 1) {
      return 'User has been updated.';
    }
    throw new BadRequestException('User was not updated.');
  }

  @Get(':id')
  async getUser(@Param(':id') id: string) {
    const user = await this.userService.getOne({ id });
    if (!user) throw new NotFoundException('User was not found.');
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param(':id') id: string) {
    return await this.userService.delete(id);
  }

  @Patch('profile-image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required.');
    return await this.updateUser(id, { profileImage: file.filename });
  }
}
