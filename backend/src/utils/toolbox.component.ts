import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolBoxComponent {
  groupBy(array: Array<any>, func: any) {
    const groups = {};
    array.forEach(function (obj) {
      const group = JSON.stringify(func(obj));
      groups[group] = groups[group] || [];
      groups[group].push(obj);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }
}
