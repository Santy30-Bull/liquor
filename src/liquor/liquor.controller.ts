import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LiquorService } from './liquor.service';
import { CreateLiquorDto } from './dto/create-liquor.dto';
import { UpdateLiquorDto } from './dto/update-liquor.dto';

@Controller('liquor')
export class LiquorController {
  constructor(private readonly liquorService: LiquorService) {}

  @Post()
  create(@Body() createLiquorDto: CreateLiquorDto) {
    return this.liquorService.create(createLiquorDto);
  }

  @Get()
  findAll() {
    return this.liquorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liquorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLiquorDto: UpdateLiquorDto) {
    return this.liquorService.update(+id, updateLiquorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.liquorService.remove(+id);
  }
}
