export class Entity {

    constructor(level,index){
        this.level=level
        this.index=index
        this.style={
            marginLeft: level*20
        }
    }

    setValues(values){
        this.values=values
        return this
    }

    setColors(colors){
        this.colors=colors
        return this
    }

    setStyle(style){
        this.style={...this.style,...style}
        return this
    }

    setCanCollapse(canCollapse){
        this.canCollapse=canCollapse
        return this
    }

    getEntity(){
        return {
            _id:Math.floor(100000 + Math.random() * 900000),
            values:this.values,
            colors:this.colors,
            style:this.style,
            canCollapse:this.canCollapse,
            collapse:false,
            parenthesesId:`${this.level}-${this.index}`
        }
    }

    static closingParenthesesIndex=(heirarchy, parenthesesId)=> {
        let index = heirarchy.findIndex((item) => {
            return item.parenthesesId == parenthesesId && !item.canCollapse
        })
        if (index == -1) {
            return false
        }
        return index + 1
    }
}

