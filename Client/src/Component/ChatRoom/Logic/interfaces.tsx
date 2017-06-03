import {Map} from 'immutable';

interface IType {
    type: string;
}

// NEW MESSAGE
interface IActionNewMessageParameters {
    newMessage: string;
    roomName: string;
}
export interface IActionNewMessageReturn extends IActionNewMessageParameters, IType {}

export declare type  IActionNewMessage  = (Parameter: IActionNewMessageParameters) => IActionNewMessageReturn;

// JOIN ROOM
export interface IActionJoinedRoomReturn {
    type: string;
    newRoom: Map<string,
        {
            messages: string[];
            users: string[];
        }>;
}

export declare type IActionJoinedRoom = (roomName: string) => IActionJoinedRoomReturn ;

// NEW USER

interface IActionNewUserParameters {
    roomName: string;
    userName: string;
}

export interface IActionNewUserReturn extends IActionNewUserParameters, IType {}

export declare type IActionNewUser = (parameter: IActionNewUserParameters) => IActionNewUserReturn;
