import { Entity } from './Entity';
import { isObject } from './Utils';
import { ArrayTree } from './ArrayTree';

export class ObjectTree {

    generateTree(entity, level) {
        let items = [];
        Object.keys(entity).map((key, index) => {
            let value = entity[key];
            let color = "blue";
            if (Array.isArray(entity[key])) {
                value = "[";
                color = "black";
            }
            if (isObject(entity[key])) {
                value = "{";
                color = "black";
            }
            let entity1 = new Entity(level, index)
                .setValues([key, " :", ` ${value}`])
                .setColors(["orange", "black", color])
                .setCanCollapse(Array.isArray(entity[key]) || isObject(entity[key]))
            items.push(entity1.getEntity());
            if (Array.isArray(entity[key])) {
                let entity1 = new Entity(level, index)
                    .setValues(["]"])
                    .setColors(["black"])
                    .setCanCollapse(false)
                items = [...items, ...new ArrayTree().generateTree(entity[key],level + 1), ...[entity1.getEntity()]];
            }
            if (isObject(entity[key])) {
                let entity2 = new Entity(level, index)
                    .setValues(["}"])
                    .setColors(["black"])
                    .setCanCollapse(false)
                items = [...items, ...this.generateTree(
                    entity[key],
                    level + 1
                ), ...[entity2.getEntity()]];
            }
        });
        return items
    }
}