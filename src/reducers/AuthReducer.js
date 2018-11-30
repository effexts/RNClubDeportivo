import { EMAIL_CHANGED, PASSWORD_CHANGED } from '../actions/types';

const INITIAL_STATE = { email: '', labelEmail:'Correo Electrónico', password: '', error:'' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED: {
            let labelEmail='';
                if (action.payload!=='' && !action.payload.includes('@')) {
                    labelEmail='No es una dirección de correo válida';
                } else {
                    labelEmail='Correo Electrónico';
                }
                
                return { ...state, email: action.payload, labelEmail }
            }
        case PASSWORD_CHANGED: {
            return { ...state, password: action.payload}
        }
        default:
            return state;
    }
};