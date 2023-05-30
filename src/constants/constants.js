export const UserRoles = {
    ADMIN: 'Admin',
    INSTRUCTOR: 'Instructor',
    USUARIO: 'Usuario',
};

export const UserLevels = {
    PRINCIPIANTE: 'Principiante',
    INTERMEDIO: 'Intermedio',
    AVANZADO: 'Avanzado',
};

export const Collections = {
    Users: {
        id: String,
        name: String,
        lastName: String,
        role: UserRoles,
        level: UserLevels,
        email: String,
        password: String,
    },

    Routines: {
        type: String,
        level: UserLevels,
        name: String,
        exercises: [
            {
                exerciseName: String,
                sets: String,
                reps: String,
            },
        ],
    },

    Diets: {
        name: String,
        description: String,
        author: String,
    },

    Blogs: {
        title: String,
        author: String,
        content: String,
        publishDate: Date,
    },

    BodyMeasurementRecords: {
        userId: String,
        bodyFatPercentage: Number,
        measurementDate: Date,
        weight: Number,
    },
};