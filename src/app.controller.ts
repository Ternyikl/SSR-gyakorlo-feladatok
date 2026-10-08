import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import fs from 'node:fs';
import { Wanted } from './type.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getTitle() {
    return {
      title: 'SSR gyakorlás',
      greeting: 'Üdvözölek a SSR gyaló feladatban'
    }
  }

  @Get('bekezdesek')
  @Render('bekezdesek')
  async getBekezdesek() {
    const bekezdesek: string[] = await fs.readFileSync('./src/szoveg.txt', "utf-8").split('\n')

    return { bekezdesek };
  }

  @Get('piros-kek')
  @Render('red-blue')
  getPirosKek() {
    const hatterszin: string = Math.random() < 0.5 ? 'red' : 'blue';
    const szovegszin: string = (hatterszin === "red") ? 'black' : "white";

    return { hatterszin, szovegszin };
  }

  @Get('Wanted')
  @Render('wanted')
  async getWanted(){
    const seged: string =  await fs.readFileSync('./data/wanted.json', "utf-8");
    return {
      wanted: JSON.parse(seged) as Wanted
    }
  }
  
}
