import { Entity } from "./Entity"

export class Tree {
    constructor() {
        this.lineItems = []
    }

    isObject(object){
        return typeof object === 'object' && !Array.isArray(object) && object !== null
    }

    generateTree(entity, level = 0) {
        if (this.isObject(entity)) {

            Object.keys(entity).map((key, index) => {

                let value = entity[key]
                let color = 'blue'
                if (Array.isArray(entity[key])) {
                    value = '['
                    color = 'black'
                }
                if (this.isObject(entity[key])) {
                    value = '{'
                    color = 'black'
                }
                this.lineItems.push(new Entity([key, ' :', ` ${value}`], ['orange', 'black', color], []))

                if (Array.isArray(entity[key]) || this.isObject(entity[key])) {

                    this.lineItems[this.lineItems.length - 1]['children'] = this.generateTree(entity[key], level + 1)
                }
            })
            this.lineItems.push(new Entity(['}'], ['black'], []))
        }

        if (Array.isArray(entity)) {
            entity.forEach((item) => {

                this.lineItems.push(new Entity(['{'], ['black'], []))
                Object.keys(item).map((key, index) => {

                    let value = item[key]
                    let color = 'blue'
                    if (Array.isArray(item[key])) {
                        value = '['
                        color = 'black'
                    }
                    if (this.isObject(item[key])) {
                        value = '{'
                        color = 'black'
                    }

                    this.lineItems.push(new Entity([key, ' :', ` ${value}`], ['orange', 'black', color], []))

                    if (Array.isArray(item[key]) || this.isObject(item[key])) {
                        this.lineItems[this.lineItems.length - 1]['children'] = this.generateTree(item[key], level + 1)
                    }
                })

                this.lineItems.push({
                    values: ['}'],
                    colors: ['black']
                })
            })

            this.lineItems.push({
                values: [']'],
                colors: ['black']
            })
        }
        return this.lineItems
    }
}