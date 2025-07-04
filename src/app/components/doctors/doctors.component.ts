import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swiper from 'swiper';
import 'swiper/css/bundle';
import { Doctor } from '../../interfaces/doctor.interface';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements AfterViewInit {
  doctors: Doctor[] = [];
  swiperInstance?: Swiper;

  constructor(private _DoctorsService: DoctorsService, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params) => {
      const departmentId = params.get('departmentID');

      const fetch$ = departmentId
        ? this._DoctorsService.getDoctorsByDepartment(departmentId)
        : this._DoctorsService.getAllDoctors();

      fetch$.subscribe((data) => {
        this.doctors = data;
        setTimeout(() => {
          if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
          }
          this.swiperInstance = new Swiper('.doctor-swiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            breakpoints: {
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            },
          });
        }, 0);
      });
    });
  }
}
