import { IResultService } from '@/interfaces/IResultService';

class ResultStore {
    resultService: IResultService;

    constructor(resultService: IResultService) {
        this.resultService = resultService;
    }
}

export default ResultStore;
