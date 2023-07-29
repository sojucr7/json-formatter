export const isObject=(object)=> {
    return (
        typeof object === "object" && !Array.isArray(object) && object !== null
    );
}