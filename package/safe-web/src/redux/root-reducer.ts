import { combineReducers } from "redux";
import menuReducer from "./dropdown-menu/dropdown-menu.reducer";
import materialsReducer from "./materials/materials.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    dropdownMenu: menuReducer,
    materials: materialsReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;