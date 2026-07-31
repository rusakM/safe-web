import { dbConnector } from '../core';

import * as model from '../models/Course';
export import Model = model;

class dbConnectorCourse extends dbConnector<Model.IDBCourse, Model.ICourse, Model.TIndexes> {
    constructor() {
        super(Model.Course);
    }
}

export const DB = new dbConnectorCourse();
