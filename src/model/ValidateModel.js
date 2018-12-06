import BaseModel from './BaseModel'
import { batch } from '../utils/validate'

var validateEmail = (value) => {
    let status = true;
    if (value === '') {
        status = false
    }
    return status
};

/**
 * 表单验证 model
 */
class ValidateModel extends BaseModel {
    constructor () {
        super();
        this.email = '';
        this.password = '';
        this.cities = ['上海', '北京', '广州', '深圳'];
        this.checkedCities = ['上海', '北京'];
        this.list = [
            { name:"上海",value: 'sh' },
            { name:"北京",value: 'bj' },
            { name:"广州",value: 'gz' },
            { name:"深圳",value: 'sz' }
        ];
        this.checkedList = [
            { name:"上海",value: 'sh' },
            { name:"北京",value: 'bj' }
        ];
        this.rules = {
            email: [
                { validator: validateEmail, trigger: 'blur', message: '请输入邮箱' },
                { validator: 'isNonEmpty', message: '你的输入的邮箱为空' }
            ],
            password: [
                { validator: 'isNonEmpty', message: '请输入密码', trigger: 'blur' }
            ],
            checkedList: [
                { validator: 'isNonEmpty', message: '请选择城市', trigger: 'change' }
            ],
            checkedCities: [
                { validator: 'isNonEmpty', message: '请选择城市', trigger: 'change' }
            ]
        }
    }
    validate (callback) {
        let formData = {
            email: this.email,
            password: this.password
        };
        batch((valid, message) => {
            if (!valid) {
                callback(valid, message)
            }
        }, formData, this.rules)
    }
}

export { ValidateModel }
