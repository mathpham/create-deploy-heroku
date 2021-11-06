export const checkLoginReducer = (state = 0, action) => {
    switch (action.type) {
        case "CHECK_AUTH_LEVEL":
            {
                let user = JSON.parse(localStorage.getItem("user"));
                if (user != null) {
                    for (let i = 0; i < user.roles.length; i++) {
                        let item = user.roles[i];
                        if (item === "ROLE_USER" && state < 1) {
                            state = 1;
                        }
                        else if (item === "ROLE_HOUSEHOLDER" && state < 2) {
                            state = 2;
                        }
                        else if (item === "ROLE_ADMIN" && state < 3) {
                            state = 3;
                        }
                    }
                } else {
                    state = 0;
                }
                return state;
            }
        case "SIGN_OUT":
            {
                localStorage.removeItem("user");
                state = 0;
                return state;
            }

        default:
            return state;
    }
};

export default checkLoginReducer;
