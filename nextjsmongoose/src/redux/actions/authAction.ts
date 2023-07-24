export enum AuthActionTypes {
 SET_LOGIN_STATUS = "SET_LOGIN_STATUS",
}

export interface SetLoginStatusAction {
 type: AuthActionTypes.SET_LOGIN_STATUS;
 payload: boolean;
}

export type AuthAction = SetLoginStatusAction;

export const setLoginStatus = (isLoggedIn: boolean): AuthAction => ({
 type: AuthActionTypes.SET_LOGIN_STATUS,
 payload: isLoggedIn,
});