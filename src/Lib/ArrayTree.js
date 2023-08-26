import { Entity } from './Entity';
import { isObject } from './Utils';
import { ObjectTree } from './ObjectTree';

export class ArrayTree {

    generateTree(entity, level) {
        let items = [];
        entity.forEach((item, index1) => {
            if (isObject(item)) {
                let entity1 = new Entity(level, index1)
                    .setValues(["{"])
                    .setColors(["black"])
                    .setCanCollapse(true)
                items.push(entity1.getEntity());
                let entity2 = new Entity(level, index1)
                    .setValues(["}"])
                    .setColors(["black"])
                items = [...items, ...new ObjectTree().generateTree(item, level + 1), ...[entity2.getEntity()]];
            } else if (Array.isArray(item)) {
                let entity1 = new Entity(level, index1)
                    .setValues(["["])
                    .setColors(["black"])
                    .setCanCollapse(true)

                let entity2 = new Entity(level, index1)
                    .setValues(["]"])
                    .setColors(["black"])
                items.push(entity1.getEntity());
                items = [...items, ...this.generateTree(item, level + 1), ...[entity2.getEntity()]];
            } else {
                let entity1 = new Entity(level, index1)
                    .setValues([item, ','])
                    .setColors(["blue", 'black'])
                items.push(entity1.getEntity());
            }
        });
        return items;
    }
}