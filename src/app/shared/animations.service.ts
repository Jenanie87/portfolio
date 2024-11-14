import { Injectable } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }

  public getButtonAnimation() {
    return trigger('buttonAnimation', [
      state('start', style({
        // Werte in der style.scss
      })),
      state('end', style({
        padding: '20px 80px',
        fontWeight: 700,
        boxShadow: '5px 5px 15px 0px #00000026'
      })),
      transition('start => end', animate('150ms ease-out')),
      transition('end => start', animate('150ms ease-out'))
    ]);
  }

  public fadeContentToSide() {
    return trigger('informationAnimation', [
      state('start', style({
        opacity: 0,
        transform: 'translateX({{direction}})'
      }), { params: { direction: '100%' } }),
      state('end', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('start => end', animate('100ms ease-in')),
      transition('end => start', animate('100ms ease-out'))
    ]);
  }

  public projectHoverAnimation() {
    return [
      trigger('borderAnimation', [
        state('hidden', style({
          opacity: 0
        })),
        state('visible', style({
          opacity: 1
        })),
        transition('hidden => visible', animate('150ms 1ms linear')),
        transition('visible => hidden', animate('150ms linear'))
      ]),
      trigger('arrowAnimation', [
        state('hidden', style({
          opacity: 0,
        })),
        state('visible', style({
          opacity: 1
        })),
        transition('hidden => visible', animate('150ms ease-in')),
        transition('visible => hidden', animate('150ms ease-out'))
      ]),
      trigger('enlargeImg', [
        state('normal', style({

        })),
        state('bigger', style({
          transform: 'rotate(0deg) scale(2.0)'
        })),
        transition('normal => bigger', animate('450ms ease-in', keyframes([
          style({ transform: 'rotate(135deg) scale(1.0)', offset: 0 }),
          style({ transform: 'rotate(90deg) scale(1.5)', offset: 0.5 }),
          style({ transform: 'rotate(0deg) scale(2.0)', offset: 1.0 }),
        ]))),
        transition('bigger => normal', animate('300ms ease-out'))
      ])
    ];
  }

  public rotateImage() {
    return [
      trigger('rotateImgAnimation', [
        state('first', style({

        })),
        state('last', style({
          clipPath: 'inset(0 0 0 0)',
          transform: 'translateX(0px)',
          width: '70px',
          height: '75px'
        })),
        transition('first => last', animate('300ms ease-in', keyframes([
          style({ clipPath: 'inset(0 17px 0 0)', width: '70px', height: '75px', transform: 'translateX(27px)' }),
          style({ clipPath: 'inset(0 27px 0 0)', width: '54px', height: '58px', transform: 'translateX(40px)' }),
          style({ clipPath: 'inset(0 0 0 27px)', width: '54px', height: '58px', transform: 'translateX(-40px)' }),
          style({ clipPath: 'inset(0 0 0 17px)', width: '70px', height: '75px', transform: 'translateX(-27px)' }),
          style({ clipPath: 'inset(0 0 0 0)', width: '70px', height: '75px', transform: 'translateX(0px)' }),
        ]))),
        transition('last => first', animate('50ms ease-out'))
      ])
    ];
  }

  public fadeContentToBottom() {
    return [
      trigger('navAnimation', [
        state('start', style({
          opacity: 0,
          transform: 'translateY(50%)'
        })),
        state('end', style({
          opacity: 1,
          transform: 'translateY(0)'
        })),
        transition('start => end', animate('150ms 10ms ease-out')),
        transition('end => start', animate('150ms ease-out'))
      ]),
      trigger('backgroundAnimation', [
        state('first', style({
          paddingTop: '25px'
        })),
        state('last', style({
          paddingTop: '95px'
        })),
        transition('first => last', animate('150ms 50ms ease-out')),
        transition('last => first', animate('150ms ease-out'))
      ]),
      trigger('bottomAnimation', [
        state('hidden', style({
          opacity: 0,
          visibility: 'hidden',
        })),
        state('visible', style({
          opacity: 1,
          visibility: 'visible',
        })),
        transition('hidden => visible', animate('150ms ease-out')),
        transition('visible => hidden', animate('150ms ease-out'))
      ])
    ];
  }

  public moveLine() {
    return [
      trigger('lineAnimation', [
        state('normal', style({
          width: '0px', 
          opacity: 0,
          transform: 'translateX(0) translateY(33px)'
        })),
        state('hover', style({
          width: '244px', 
          opacity: 1,
          transform: 'translateX(175px) translateY(33px)' 
        })),
        transition('normal => hover', animate('200ms ease-in', keyframes([
          style({ width: '580px', opacity: 1, transform: 'translateX(0) translateY(33px)', offset: 0.3 }), 
          style({ width: '244px', opacity: 1, transform: 'translateX(175px) translateY(33px)', offset: 1.0 })
        ]))),
        transition('hover => normal', animate('150ms ease-out')) 
      ])
    ];
  }

  public scrollToSection(event: MouseEvent, id: string) {
    event.preventDefault();
    const section = document.getElementById(id);

    document.documentElement.style.scrollBehavior = 'auto';

    if (section) {
      section.scrollIntoView({ behavior: 'auto' });
    }

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 500);
  }
}





