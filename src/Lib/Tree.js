import { isObject } from './Utils';
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
                },
                canCollapse:Array.isArray(entity[key]) || isObject(entity[key]),
                collapseId:Array.isArray(entity[key]) || isObject(entity[key])?`${level}-${index}`:''
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
                    },
                    canCollapse:false,
                    collapseId:`${level}-${index}`
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
                    },
                    canCollapse:false,
                    collapseId:`${level}-${index}`
                }]];
            }
        });
        return items;
    }

    arrayMapping(entity, level) {
        let items = [];
        entity.forEach((item, index1) => {
            if (isObject(item)) {
                items.push({
                    values: ["{"],
                    colors: ["black"],
                    style: {
                        marginLeft: level * 20
                    },
                    canCollapse:true,
                    collapseId:`${level}-${index1}`
                });
                items = [...items, ...this.objectMapping(item, level + 1), ...[{
                    values: ["}"],
                    colors: ["black"],
                    style: {
                        marginLeft: level * 20
                    },
                    canCollapse:false,
                    collapseId:`${level}-${index1}`
                }]];
            }else if(Array.isArray(item)){
                items.push({
                    values: ["["],
                    colors: ["black"],
                    style: {
                        marginLeft: level * 20
                    },
                    canCollapse:true,
                    collapseId:`${level}-${index1}`
                });
                items = [...items, ...this.arrayMapping(item, level + 1), ...[{
                    values: ["]"],
                    colors: ["black"],
                    style: {
                        marginLeft: level * 20
                    },
                    canCollapse:false,
                    collapseId:`${level}-${index1}`
                }]];
            }else{
                items.push({
                    values: [item,','],
                    colors: ["blue",'black'],
                    style: {
                        marginLeft: level * 20
                    },
                    canCollapse:false
                });
            } 
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
                },
                canCollapse:true,
                collapseId:0
            }],
            ...this.objectMapping(entity, level + 1),
            ...[{
                values: ["}"],
                colors: ["black"],
                style: {
                    marginLeft: 0
                },
                canCollapse:false,
                collapseId:0
            }]]

        } else {
            this.heirarchy = [...[{
                values: ["["],
                colors: ["black"],
                style: {
                    marginLeft: 0
                },
                canCollapse:true,
                collapseId:0
            }],
            ...this.arrayMapping(entity, level + 1),
            ...[{
                values: ["]"],
                colors: ["black"],
                style: {
                    marginLeft: 0
                },
                canCollapse:false,
                collapseId:0
            }]];
        }
        return this
    }

    closingIndex(heirarchy,collapseId){
        let index=heirarchy.findIndex((item)=>{
            return item.collapseId==collapseId && !item.canCollapse
        })
        if(index==-1){
            return false
        }
        return index+1
    }
}