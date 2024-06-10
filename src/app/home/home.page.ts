import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { App } from '@capacitor/app';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../services/datos.service'; // Importar DatosService

import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  datos: any[] = []; // Declarar la variable datos

  constructor(private browser: InAppBrowser, private datosService: DatosService) {}

  ngOnInit(): void {
    const browserInstance = this.browser.create('', '_self', 'location=no,hiddenavigationbuttons=true,hideurlbar=true,zoom=no');

    browserInstance.on("exit").subscribe(evt => {
      App.exitApp();
    });
    register();

    // Llamar al servicio para obtener datos
    this.datosService.getDatos('mi_tabla').subscribe(data => {
      this.datos = data;
      console.log(this.datos); // Verificar que los datos se reciben correctamente
    });
  }

  swiper_images = [
    '../../assets/imagenes/telefonia.jpg',
    '../../assets/imagenes/computo.jpg',
    '../../assets/imagenes/gaming.jpg',
  ];

  @ViewChild("swiperEx") swiperEx?: ElementRef<{ swiper: Swiper }>;

  onSlideChange() {
    console.log(this.swiperEx?.nativeElement.swiper.activeIndex);
  }

  onSlidePrev() {
    this.swiperEx?.nativeElement.swiper.slidePrev();
  }

  onSlideNext() {
    this.swiperEx?.nativeElement.swiper.slideNext(1000);
  }
}
