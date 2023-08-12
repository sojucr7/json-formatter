import { Entity } from './Entity';
import { isObject } from './Utils';
import { ArrayTree } from './ArrayTree';
import { ObjectTree } from './ObjectTree';

export class Tree {

    heirarchy = [];

    generateTree(entity, level = 0) {

        let rootEntity1 = new Entity(level, 0)
            .setValues(["{"])
            .setColors(["black"])
            .setCanCollapse(true)

        let rootEntity2 = new Entity(level, 0)
            .setValues(["}"])
            .setColors(["black"])
            .setCanCollapse(false)

        if (isObject(entity)) {

            this.heirarchy = [
                ...[rootEntity1.getEntity()],
                ...new ObjectTree().generateTree(entity, level + 1),
                ...[rootEntity2.getEntity()]
            ]

        } else {

            let rootEntity1 = new Entity(level, 0)
                .setValues(["["])
                .setColors(["black"])
                .setCanCollapse(true)

            let rootEntity2 = new Entity(level, 0)
                .setValues(["]"])
                .setColors(["black"])
                .setCanCollapse(false)

            this.heirarchy = [
                ...[rootEntity1.getEntity()],
                ...new ArrayTree().generateTree(entity, level + 1),
                ...[rootEntity2.getEntity()]
            ];
        }
        return this
    }


}