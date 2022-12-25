import { authConstant } from "../constants/authConstant"

export const authReducer = (state, actions) => {
    if (actions.type === authConstant.AUTH) return { ...state, auth: actions.payload.auth }
    if (actions.type === authConstant.LOADING) return { ...state, loading: actions.payload.loading }
    if (actions.type === authConstant.USER) return { ...state, user: actions.payload.user }
    if (actions.type === "msignup") return { ...state, msignup: actions.payload, mlogin: false, mlogout: false, mbuy: false, msell: false }
    if (actions.type === "mlogin") return { ...state, mlogin: actions.payload, msignup: false, mlogout: false, mbuy: false, msell: false }
    if (actions.type === "mlogout") return { ...state, mlogout: actions.payload, mlogin: false, msignup: false, mbuy: false, msell: false }
    if (actions.type === "mbuy") return { ...state, mbuy: actions.payload, mlogin: false, mlogout: false, msignup: false, msell: false }
    if (actions.type === "msell") return { ...state, msell: actions.payload, mlogin: false, mlogout: false, mbuy: false, msignup: false }
}