import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ImagesService } from './images.service'
import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto, @User() user: IUser) {
    return this.imagesService.create(createImageDto, user)
  }

  @Get()
  findAll() {
    return this.imagesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id)
  }
}
