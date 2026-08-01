import React from "react";
import { TYPES_ENUM } from "../../helpers/constants/course";
import type { IQuestionComponentProps } from "./questions.types";

import SingleChoose from "./single-choose/single-choose";
import SelectCorrectAnswer from "./select-correct-answer/select-correct-answer";
import MultiChoose from "./multi-choose/multi-choose";
import FitTiles from "./fit-tiles/fit-tiles";
import TrueFalse from "./true-false/true-false";

const QuestionRenderer: React.FC<IQuestionComponentProps> = (props) => {
    const { question } = props;
    const type = question.type as TYPES_ENUM;

    switch (type) {
        case TYPES_ENUM.SINGLE_CHOOSE:
            return <SingleChoose {...props} />;
        case TYPES_ENUM.SELECT_CORRECT_ANSWER:
            return <SelectCorrectAnswer {...props} />;
        case TYPES_ENUM.MULTI_CHOOSE:
            return <MultiChoose {...props} />;
        case TYPES_ENUM.FIT_TILES:
            return <FitTiles {...props} />;
        case TYPES_ENUM.TRUE_FALSE:
            return <TrueFalse {...props} />;
        default:
            return <SelectCorrectAnswer {...props} />;
    }
};

export default QuestionRenderer;
