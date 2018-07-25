
import objectAssign from 'object-assign';

let delay = 2000;
let value = {"text": "Jyoti"};
export default class AppApi {
    static getData() {
        return new Promise( (resolve) => {
            setTimeout(()=> {
                resolve(objectAssign({},value));
            },delay);
        });      
    }
}