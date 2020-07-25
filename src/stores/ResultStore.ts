import { IResultService } from '@/interfaces/IResultService';

class ResultStore {
    private resultService: IResultService;

    constructor(resultService: IResultService) {
        this.resultService = resultService;
    }
}

export default ResultStore;
