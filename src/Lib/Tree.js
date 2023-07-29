import { Entity } from "./Entity";

export class Tree {
  isObject(object) {
    return (
      typeof object === "object" && !Array.isArray(object) && object !== null
    );
  }

  objectMapping(entity, level) {
    let items = [];
    let lineItems = [];
    Object.keys(entity).map((key, index) => {
      
      let value = entity[key];
      let color = "blue";
      if (Array.isArray(entity[key])) {
        value = "[";
        color = "black";
      }

      if (this.isObject(entity[key])) {
        value = "{";
        color = "black";
      }

      items.push({
        values: [key, " :", ` ${value}`],
        colors: ["orange", "black", color],
      });

      if (Array.isArray(entity[key])) {
        items[items.length - 1]["children"] =[...this.arrayMapping(
          entity[key],
          level + 1
        ),...[{
          values: ["]"],
          colors: ["black"],
        }]] ;
      }

      if (this.isObject(entity[key])) {
        items[items.length - 1]["children"] = [...this.objectMapping(
          entity[key],
          level + 1
        ),...[{
          values: ["}"],
          colors: ["black"],
        }]];
      }
    });

    lineItems.push({children:items});
    return lineItems;
  }

  arrayMapping(entity, level) {
    let items = [];
    let lineItems = [];
    entity.forEach((item, index1) => {

      items.push({
        values: ["{"],
        colors: ["black"],
      });

      items = [...items, ...this.objectMapping(item, level),...[{
        values: ["}"],
        colors: ["black"],
      }]];
    });
    lineItems.push({children:items});
    return lineItems;
  }

  generateTree(entity, level = 0) {
    if (this.isObject(entity)) {
      
      return [...[{
        values: ["{"],
        colors: ["black"],
      }],
      ...this.objectMapping(entity, level),
      ...[{
        values: ["}"],
        colors: ["black"],
      }]];
     
    } else {      
      return [...[{
        values: ["["],
        colors: ["black"],
      }],
      ...this.arrayMapping(entity, level),
      ...[{
        values: ["]"],
        colors: ["black"],
      }]];
    }
  }
}