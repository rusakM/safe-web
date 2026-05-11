import { combineReducers } from "redux";
import menuReducer from "./dropdown-menu/dropdown-menu.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    dropdownMenu: menuReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;