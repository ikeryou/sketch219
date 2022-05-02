
import { Con } from "../con/con";
import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _txtA:HTMLElement;
  private _txtB:HTMLElement;

  constructor(opt:any) {
    super(opt)

    this._txtA = document.querySelector('.l-select.-a') as HTMLElement;
    this._txtA.innerHTML = Conf.instance.TEXT_A;


    this._txtB = document.querySelector('.l-select.-b') as HTMLElement;
    this._txtB.innerHTML = Conf.instance.TEXT_B;

    new Con({
      el:document.querySelector('.l-canvas')
    });
  }


  protected _update(): void {
    super._update();

    let selectType = -1
    const test = window.getSelection()?.toString() || ''
    if(test.includes(Conf.instance.TEXT_A.substring(0, 1))) {
      selectType = 0
    }
    if(test.includes(Conf.instance.TEXT_B.substring(0, 1))) {
      selectType = 1
    }

    if(selectType != -1) {
      const start = window.getSelection()?.anchorOffset || 0;
      const end = window.getSelection()?.focusOffset || 0;

      Param.instance.selectedNo[selectType][0] = start;
      Param.instance.selectedNo[selectType][1] = end;

      Param.instance.debug.innerHTML = ['A', 'B'][selectType] + '_' + start + '_' + end;
    }
  }
}