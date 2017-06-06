import {Map} from 'immutable';
import {JOINED_ROOM, NEW_MESSAGE, NEW_USER} from './ChatActions';
import {IActionJoinedRoomReturn, IActionNewMessageReturn, IActionNewUserReturn} from './interfaces';
interface IProperty extends Map<any, any> {
    rooms: Map<any, Map<string, any>>
}

const InitialState: Map<string, any> = Map(({
    rooms: Map({})
} as IProperty));

const ChatReducer = (state = InitialState, action?: IActionChatReducer) => {

    switch (action.type) {

        case JOINED_ROOM:
            return state.get('rooms')
                .concat(action.newRoom);
        case NEW_MESSAGE:
            return state.getIn([action.roomName, 'messages'])
                .concat(action.newMessage);
        case NEW_USER:
            return state.getIn(action.roomName, 'users')
                .concat(action.userName)
        default:
            return state;
    }

};

interface IActionChatReducer extends IActionNewMessageReturn,
    IActionJoinedRoomReturn, IActionNewUserReturn {
}
