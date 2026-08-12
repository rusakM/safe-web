export const Footer = {
    conditionTerms: "/cdn/assets/PlanetGoals_Terms_of_Service.pdf",
    instagram: "https://www.instagram.com/safeweb_erasmusplusproject?igsh=cTVidWFxdnV5bWtx",
    linkedIn: "https://www.linkedin.com/company/safeweberasmusplusproject/",
    privacyPolicy: "/cdn/assets/PlanetGoals_Privacy_Policy.pdf",
    youtube: "https://www.youtube.com/@PlanetGoals-SDGs",
};

export const Course = {
    get: (courseId: string) => `/api/course/${courseId}`,
    getAll: "/api/course/list",
    getPlayerCourse: (courseId: string) => `/api/course/${courseId}/stats`,
    getPlayerStats: "/api/course/stats",
    sendAnswer: (courseId: string) => `/api/course/${courseId}/answer`,
};

export const LandingPage = {
    blog: "https://safeweb.um.si/",
    confirm: "/confirm",
    fillRegisterData: "/signup-finish",
    main: "/",
    signIn: "/signin",
    signUp: "/signup",
};

export const Main = {
    activeCourse: "/course/:courseId?",
    courses: "/courses",
    courseSummary: "/course-summary/:courseId?",
    game: "/game",
    startLessons: "/lessons",
    lobby: "/lobby",
    myProgress: "/my-progress",
    materials: "/materials",
    myProfile: "/my-profile",
};

export const Materials = {
    cdnMaterials: "/cdn/materials",
    getMaterials: "/api/materials",
};

export const Partners = {
    eurolider: "https://euro-lider.eu",
    mdu: "https://www.mdu.se",
    nova: "https://www.unl.pt",
    preparemeai: "https://prepareme.ai",
    smarts: "https://smarts.com.gr",
    spin: "https://www.spinsystem.eu",
    sydic: "https://systemdynamics.it",
    um: "https://www.um.si",
}

export const User = {
    checkEmail: "/api/user/auth/login",
    confirm: "/api/user/auth/confirm",
    edit: "/api/user/auth/edit",
    me: "/api/user/auth/me",
    refreshToken: "/api/user/auth/refresh-token",
    signUp: "/api/user/auth/register",
    stats: "/api/user/stats",
};
