import { Entity } from "./Entity";
import {isObject} from './Utils';
export class Tree {


    heirarchy = [];

    objectMapping(entity, level) {
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
            items.push({
                values: [key, " :", ` ${value}`],
                colors: ["orange", "black", color],
                style: {
                    marginLeft: level * 20
                }
            });
            if (Array.isArray(entity[key])) {
                items = [...items, ...this.arrayMapping(
                    entity[key],
                    level + 1
                ), ...[{
                    values: ["]"],
                    colors: ["black"],
                    style: {
                        marginLeft: level * 20
                    }
                }]];
            }
            if (isObject(entity[key])) {
                items = [...items, ...this.objectMapping(
                    entity[key],
                    level + 1
                ), ...[{
                    values: ["}"],
                    colors: ["black"],
                    style: {
                        marginLeft: level * 20
                    }
                }]];
            }
        });
        return items;
    }

    arrayMapping(entity, level) {
        let items = [];
        entity.forEach((item, index1) => {
            items.push({
                values: ["{"],
                colors: ["black"],
                style: {
                    marginLeft: level * 20
                }
            });
            items = [...items, ...this.objectMapping(item, level + 1), ...[{
                values: ["}"],
                colors: ["black"],
                style: {
                    marginLeft: level * 20
                }
            }]];
        });
        return items;
    }

    generateTree(entity, level = 0) {
        if (isObject(entity)) {
            this.heirarchy = [...[{
                values: ["{"],
                colors: ["black"],
                style: {
                    marginLeft: 0
                }
            }],
            ...this.objectMapping(entity, level + 1),
            ...[{
                values: ["}"],
                colors: ["black"],
                style: {
                    marginLeft: 0
                }
            }]]

        } else {
            this.heirarchy = [...[{
                values: ["["],
                colors: ["black"],
                style: {
                    marginLeft: 0
                }
            }],
            ...this.arrayMapping(entity, level + 1),
            ...[{
                values: ["]"],
                colors: ["black"],
                style: {
                    marginLeft: 0
                }
            }]];
        }
        return this
    }

    size(heirarchy) {
        return this.heirarchy.length
    }
}